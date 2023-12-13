#! /bin/bash

# Change directory to the mgi folder
cd /home/ubuntu/MP/repo/mp

echo "['server.pl'], startServer(2227)." | swipl -g "consult('server.pl'), startServer(2227)."
