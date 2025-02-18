#!/bin/sh

# Démarrer Ollama en arrière-plan
ollama serve &

# Attendre qu'Ollama soit prêt
echo "Waiting for Ollama to be available..."
until curl -s http://localhost:${OLLAMA_PORT}/api/models > /dev/null; do
    echo "Ollama is not ready yet. Retrying in 5 seconds..."
    sleep 5
done

# Vérifier si on doit utiliser un modèle local
if [ "$LOCAL_MODEL" = "true" ]; then
    echo "Downloading local model: ${LOCAL_MODEL_NAME}..."
    ollama pull ${LOCAL_MODEL_NAME}
    
    # Vérifier si le téléchargement a réussi
    if [ $? -eq 0 ]; then
        echo "Model ${LOCAL_MODEL_NAME} downloaded successfully"
    else
        echo "Failed to download model ${LOCAL_MODEL_NAME}"
        exit 1
    fi
else
    echo "Using remote model. No local model will be downloaded."
fi

# Attendre indéfiniment pour garder le conteneur en vie
wait