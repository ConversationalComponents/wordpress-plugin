#! /bin/sh
cd frontend
npm run build
cd ..
rm -rf coco-bot/build
mv frontend/build coco-bot/build
if [ -f coco-bot.zip ]; then rm coco-bot.zip; fi
zip -r coco-bot.zip coco-bot/*