#!/usr/bin/env sh

set -e

# build
npm run docs:build

# go to build output
cd docs/.vitepress/dist

# init temp repo
git init
git add -A
git commit -m 'deploy docs'

# push to gh-pages
git push -f git@github.com:maynkudu/hooks.git HEAD:gh-pages
