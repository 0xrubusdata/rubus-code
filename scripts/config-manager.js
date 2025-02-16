const fs = require('fs');
const readline = require('readline');
const path = require('path');
const axios = require('axios');
const { spawn } = require('child_process');

const envFilePath = path.join(__dirname, '../.env');
const overrideFilePath = path.join(__dirname, '../config/config.override.json');
const modelsExternalPath = path.join(__dirname, 'modelsExternalUrl.json');
const modelsLocalPath = path.join(__dirname, 'modelsLocalList.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query, defaultValue) => {
  return new Promise((resolve) => {
    rl.question(`${query} (default: ${defaultValue}): `, (answer) => {
      resolve(answer.trim() || defaultValue);
    });
  });
};

const displayServiceUrl = (service, port, protocol = 'http') => {
  console.log(`${service} will be available at: ${protocol}://localhost:${port}`);
};

const displayDatabaseUrl = (user, password, db, port) => {
  console.log(`Database connection string: postgresql://${user}:${password}@localhost:${port}/${db}`);
};

const loadEnv = () => {
  const envData = fs.readFileSync(envFilePath, 'utf8');
  return envData.split('\n').reduce((acc, line) => {
    if (line && !line.startsWith('#')) {
      const [key, value] = line.split('=');
      acc[key.trim()] = value ? value.trim() : '';
    }
    return acc;
  }, {});
};

const loadJsonFile = (filePath) => {
  return fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : {};
};

const validateApiKey = async (url, apiKey) => {
  try {
    const response = await axios.post(url, {}, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

const startDocker = () => {
  return new Promise((resolve, reject) => {
    console.log('Starting Docker containers...');
    
    // Using spawn instead of exec for better output handling
    const dockerProcess = spawn('docker', ['compose', 'up', '--build'], {
      stdio: 'inherit'
    });

    dockerProcess.on('error', (error) => {
      reject(error);
    });

    // Note: We don't need to handle 'close' event when using inherit
  });
};

const configureEnvironment = async () => {
  // Check if config override exists and bypass setup
  if (fs.existsSync(overrideFilePath)) {
    console.log('🟢 Configuration found. Skipping setup...');
    console.log('🚀 Starting Docker containers...');
    const { exec } = require('child_process');
    exec('docker compose up --build', (err, stdout, stderr) => {
      if (err) {
        console.error(`Error: ${err.message}`);
        return;
      }
      if (stderr) console.error(stderr);
      console.log(stdout);
    });
    process.exit(0); // Stop script execution
  }
  
  console.log('Configuring environment variables...');
  const envVariables = loadEnv();
  const modelsLocal = loadJsonFile(modelsLocalPath);
  const modelsExternal = loadJsonFile(modelsExternalPath);
  const newConfig = { ...envVariables };

  // Backend Configuration
  newConfig['BACKEND_PORT'] = await askQuestion('Set BACKEND_PORT', envVariables['BACKEND_PORT']);
  displayServiceUrl('Backend API', newConfig['BACKEND_PORT']);

  // Frontend Configuration
  newConfig['FRONTEND_PORT'] = await askQuestion('Set FRONTEND_PORT', envVariables['FRONTEND_PORT']);
  displayServiceUrl('Frontend application', newConfig['FRONTEND_PORT']);

  // PostgreSQL Configuration
  console.log('\nConfiguring PostgreSQL:');
  newConfig['POSTGRES_USER'] = await askQuestion('Set POSTGRES_USER', envVariables['POSTGRES_USER']);
  newConfig['POSTGRES_PASSWORD'] = await askQuestion('Set POSTGRES_PASSWORD', envVariables['POSTGRES_PASSWORD']);
  newConfig['POSTGRES_DB'] = await askQuestion('Set POSTGRES_DB', envVariables['POSTGRES_DB']);
  newConfig['POSTGRES_PORT'] = await askQuestion('Set POSTGRES_PORT', envVariables['POSTGRES_PORT']);
  displayDatabaseUrl(
    newConfig['POSTGRES_USER'],
    newConfig['POSTGRES_PASSWORD'],
    newConfig['POSTGRES_DB'],
    newConfig['POSTGRES_PORT']
  );

  // Adminer Configuration
  newConfig['ADMIRER_PORT'] = await askQuestion('Set ADMIRER_PORT', envVariables['ADMIRER_PORT']);
  displayServiceUrl('Adminer database management', newConfig['ADMIRER_PORT']);

  // Vector DB Configuration
  newConfig['VECTOR_DB_TYPE'] = await askQuestion('Set VECTOR_DB_TYPE', envVariables['VECTOR_DB_TYPE']);
  newConfig['VECTOR_DB_PORT'] = await askQuestion('Set VECTOR_DB_PORT', envVariables['VECTOR_DB_PORT']);
  displayServiceUrl('Vector DB', newConfig['VECTOR_DB_PORT']);

  // Portainer Configuration
  newConfig['PORTAINER_PORT'] = await askQuestion('Set PORTAINER_PORT', envVariables['PORTAINER_PORT']);
  displayServiceUrl('Portainer', newConfig['PORTAINER_PORT']);

  // AI Model Configuration
  const useLocalModel = await askQuestion('Do you want to use a local AI model? (Y/n)', envVariables['LOCAL_MODEL']);
  newConfig['LOCAL_MODEL'] = useLocalModel.toLowerCase() === 'n' ? 'false' : 'true';

  if (newConfig['LOCAL_MODEL'] === 'true') {
    console.log('\nAvailable local AI models:');
    const allModels = modelsLocal.developers.flatMap(dev => 
      dev.models.flatMap(m => m.versions.map(v => ({
        name: `${m.name}:${v.size}`,
        size: v.file_size
      })))
    );
    
    allModels.forEach((model, index) => 
      console.log(`${index + 1}. ${model.name} (${model.size})`)
    );
    
    const modelIndex = await askQuestion(`Select a local model (1-${allModels.length})`, envVariables['LOCAL_MODEL_NAME']);
    newConfig['LOCAL_MODEL_NAME'] = allModels[parseInt(modelIndex) - 1]?.name || envVariables['LOCAL_MODEL_NAME'];
    console.log(`Selected local model: ${newConfig['LOCAL_MODEL_NAME']}`);
  } else {
    console.log('\nAvailable remote AI models:');
    const remoteModels = modelsExternal.developers.flatMap(dev => dev.models.map(m => ({
      name: m.name,
      url: m.url
    })));
    
    remoteModels.forEach((model, index) => console.log(`${index + 1}. ${model.name}`));
    const modelIndex = await askQuestion(`Select a remote model (1-${remoteModels.length})`, envVariables['DISTANT_MODEL_NAME']);
    const selectedModel = remoteModels[parseInt(modelIndex) - 1];
    
    if (selectedModel) {
      newConfig['DISTANT_MODEL_NAME'] = selectedModel.name;
      newConfig['DISTANT_MODEL_URL'] = selectedModel.url;
      
      let apiKeyValid = false;
      while (!apiKeyValid) {
        const apiKey = await askQuestion(`Enter the API key for ${selectedModel.name} (Required): `);
        apiKeyValid = await validateApiKey(selectedModel.url, apiKey);
        if (apiKeyValid) {
          newConfig['DISTANT_MODEL_API_KEY'] = apiKey;
        } else {
          console.log('Invalid API key. Please try again.');
        }
      }
    }
  }

  // Save configuration
  fs.writeFileSync(overrideFilePath, JSON.stringify(newConfig, null, 2));
  console.log('\nConfiguration saved to config/config.override.json');
  
  rl.close();
  
  // Start Docker
  try {
    await startDocker();
  } catch (error) {
    console.error('Failed to start Docker:', error);
    process.exit(1);
  }
};

configureEnvironment().catch(error => {
  console.error('Configuration failed:', error);
  process.exit(1);
});