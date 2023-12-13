#! /bin/sh

sh killSPA.sh

cd /home/ubuntu/MP/

rm -rf repo

git clone --depth 1 --filter=blob:none --no-checkout https://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@github.com/ruben1132/PI5_23-24.git repo

cd repo

git sparse-checkout init --cone

git sparse-checkout set mp

git pull

cd mp

sh /home/ubuntu/MP/start_mp.sh
