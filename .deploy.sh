#!/bin/bash

set -e
set -x

cd $CI_SOURCE_PATH

WWWDIR=deploy
if [ -d $WWWDIR ]; then
  rm -rf $WWWDIR
fi
mkdir -p $WWWDIR

catkin_topological_order | while read line; do
  PKGNAME=$(echo $line | awk '{print $1}')
  PKGPATH=$(echo $line | awk '{print $2}')
  cp -r $PKGPATH/www $WWWDIR/$PKGNAME
done

git config --global user.name "Travis-CI"
git config --global user.email "dummy@example.com"

cd $WWWDIR
git init
git add . --all
git commit -m "Deploy to GitHub Pages"
# Don't remove '> /dev/null 2>&1'. Removing this will expose GH_TOKEN
git push --force --quiet "https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}" master:master > /dev/null 2>&1
