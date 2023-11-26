#!/bin/bash

# Define the content for the .env file
ENV_CONTENT='NEXT_PUBLIC_MGI_API_URL = "http://localhost:2225/api/"'
ENV_CONTENT="NEXT_PUBLIC_AUTH_API_URL = "http://localhost:2225/api/""

# Specify the directory path
DIRECTORY="/home/ubuntu/SPA/repo/spa"

# Create the directory if it doesn't exist
mkdir -p "$DIRECTORY"

# Write the content to a .env file in the specified directory
echo "$ENV_CONTENT" > "$DIRECTORY/.env"

echo ".env file generated successfully in $DIRECTORY."
