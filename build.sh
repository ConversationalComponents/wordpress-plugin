#! /bin/sh
cd frontend
npm ci
npm run build
cd ..
rm -rf coco-bot/build
mv frontend/build coco-bot/build
rm coco-bot.zip
zip -r coco-bot.zip coco-bot/*
