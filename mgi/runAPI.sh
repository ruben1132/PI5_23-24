#! /bin/sh

sh killAPI.sh

cd /home/ubuntu/API/

rm -rf repo

git clone --depth 1 --filter=blob:none --no-checkout https://ruben1132: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@github.com/ruben1132/PI5_23-24.git repo

cd repo

git sparse-checkout init --cone

git sparse-checkout set mgi

git pull

cd mgi

npm install

sudo nohup npm run start &
