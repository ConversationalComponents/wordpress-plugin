#! /bin/sh
cd frontend
npm ci
npm run build
cd ..
rm -rf cocohub/build
mv frontend/build cocohub/build
if [ -f cocohub.zip ]; then rm cocohub.zip; fi
zip -r cocohub.zip cocohub/*
