#!/bin/bash

# Go to the directory containing the .sh files
cd /home/ubuntu/API

# Convert all .sh files to Unix line endings
find . -type f -name "*.sh" -exec dos2unix {} \;
