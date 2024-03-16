#!/usr/bin/env sh

set -e

npm run build

cd dist

git add .
git commit -m 'deploy'

git push -f git@github.com:kenetpicado/tracker.git master:gh-pages

cd -