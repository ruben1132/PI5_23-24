#! /bin/sh

sh killAPI.sh

cd /home/ubuntu/API/

rm -rf repo

git clone --depth 1 --filter=blob:none --no-checkout https://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@github.com/ruben1132/PI5_23-24.git repo

cd repo

git sparse-checkout init --cone

git sparse-checkout set mgi

git pull

cd mgi

sh /home/ubuntu/API/generate_env.sh

npm install

# sudo node /home/ubuntu/API/startAPIScript.js

sh /home/ubuntu/API/start_api.sh
