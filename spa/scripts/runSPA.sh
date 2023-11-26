#! /bin/sh

sh killSPA.sh

cd /home/ubuntu/SPA/

rm -rf repo

git clone --depth 1 --filter=blob:none --no-checkout https://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@github.com/ruben1132/PI5_23-24.git repo

cd repo

git sparse-checkout init --cone

git sparse-checkout set spa

git pull

cd spa

sh /home/ubuntu/SPA/generate_env.sh

npm install

sh /home/ubuntu/SPA/start_spa.sh
