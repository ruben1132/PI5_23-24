#! /bin/bash

# Hardcoded port number
PORT_NUMBER=2228

# Get the list of processes using the specified port
PIDS=$(lsof -t -i :$PORT_NUMBER)

# Check if any processes are using the specified port
if [ -z "$PIDS" ]; then
  echo "No processes found using port $PORT_NUMBER"
else
  # Kill the processes
  echo "Killing processes using port $PORT_NUMBER: $PIDS"
  kill -9 -f $PIDS
fi

exit 0

pkill -9 -f "node"
