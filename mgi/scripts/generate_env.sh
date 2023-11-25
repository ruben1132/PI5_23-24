#!/bin/bash

# Define the content for the .env file
ENV_CONTENT='CLIENT_URL="https://pi-5-23-24-one.vercel.app"'
ENV_CONTENT="$ENV_CONTENT\nJWT_SECRET=\"secret\""
ENV_CONTENT="$ENV_CONTENT\nNODE_ENV=\"production\""

# Specify the directory path
DIRECTORY="/home/ubuntu/API/repo/mgi"

# Create the directory if it doesn't exist
mkdir -p "$DIRECTORY"

# Write the content to a .env file in the specified directory
echo "$ENV_CONTENT" > "$DIRECTORY/.env"

echo ".env file generated successfully in $DIRECTORY."
