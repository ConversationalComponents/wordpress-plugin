#! /bin/sh
cd frontend
npm run build
cd ..
rm -rf coco-bot/build
mv frontend/build coco-bot/build
