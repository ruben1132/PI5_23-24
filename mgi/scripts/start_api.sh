#!/bin/bash

# Change directory to the mgi folder
cd /home/ubuntu/API/repo/mgi

# Run the API in the background and detach it from the console
nohup npm run start > /dev/null 2>&1 &
