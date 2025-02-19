const fs = require('fs');
const readline = require('readline');
const path = require('path');
const axios = require('axios');
const { spawn } = require('child_process');

const envFilePath = path.join(__dirname, '../.env');
const overrideFilePath = path.join(__dirname, '../.env.override');
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

    // Charger manuellement les variables d'environnement de .env.override
    require('dotenv').config({ path: './.env.override' });

    // Vérifier que les variables sont bien chargées
    console.log('FRONTEND_PORT:', process.env.FRONTEND_PORT);
    console.log('BACKEND_PORT:', process.env.BACKEND_PORT);

    const { spawn } = require('child_process');

    const dockerProcess = spawn('docker', ['compose', 'up', '--build'], {
      stdio: 'inherit',
      env: process.env // Passer les variables d'environnement modifiées
    });

    dockerProcess.on('error', (error) => {
      reject(error);
    });
  });
};

const isValidAbsolutePath = (inputPath) => {
  const platform = process.platform;
  
  if (platform === 'linux' || platform === 'android') {
      return inputPath.startsWith('/home/');
  } else if (platform === 'darwin') { // macOS
      return inputPath.startsWith('/Users/');
  } else if (platform === 'win32') { // Windows
      return /^[A-Za-z]:\\/.test(inputPath);
  }
  
  return false;
};

const listSubdirectories = (directory) => {
  try {
      const items = fs.readdirSync(directory, { withFileTypes: true });
      return items.filter(item => item.isDirectory()).map(dir => dir.name);
  } catch (error) {
      console.error(`Error reading directory: ${directory}`, error);
      return [];
  }
};

const configureEnvironment = async () => {
  // Check if config override exists and bypass setup
  if (fs.existsSync(overrideFilePath)) {
    console.log('🟢 Configuration found. Skipping setup...');
    await startDocker();
    process.exit(0); // Stop script execution
  }
  
  console.log('Configuring environment variables...');
  const envVariables = loadEnv();
  const modelsLocal = loadJsonFile(modelsLocalPath);
  const modelsExternal = loadJsonFile(modelsExternalPath);
  const newConfig = { ...envVariables };

  // Frontend Configuration
  newConfig['NODE_ENV_FRONTEND'] = await askQuestion('Set NODE_ENV_FRONTEND', envVariables['NODE_ENV_FRONTEND']);
  
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
  
  console.log("\nPlease specify the PROJECT_PATH where your projects are stored.");
  console.log("\nThis path must be inside a valid user directory for your operating system.");

  const projectPath = await askQuestion('Set PROJECT_PATH', process.env.PROJECT_PATH || '');
  
  while (!isValidAbsolutePath(projectPath) || !fs.existsSync(projectPath)) {
      console.log("\n❌ Invalid path. Ensure it is absolute and exists in your system.");
      projectPath = await askQuestion('Set PROJECT_PATH', process.env.PROJECT_PATH || '');
  }
  newConfig['PROJECT_PATH'] = projectPath;

  console.log("\n✅ PROJECT_PATH has been set to: ", projectPath);
  console.log("\nOnly the following directories and their subdirectories can be used:");
  const subdirs = listSubdirectories(projectPath);
  if (subdirs.length > 0) {
      subdirs.forEach(subdir => console.log(` - ${subdir}`));
  } else {
      console.log("(No subdirectories found in the selected path)");
  }
  
  const generateEnvOverride = (config) => {
    const envOverridePath = path.join(__dirname, '../.env.override');
  
    const envData = Object.entries(config)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');
  
    fs.writeFileSync(envOverridePath, envData);
    console.log(`✅ The .env.override file was generated successfully.`);
  };
  
  // Générer le fichier .env.override
  generateEnvOverride(newConfig);
  
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