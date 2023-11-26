#! /bin/bash

# Change directory to the mgi folder
cd /home/ubuntu/SPA/repo/spa

# Run the SPA in the background and detach it from the console
nohup npm run dev > /dev/null 2>&1 &
