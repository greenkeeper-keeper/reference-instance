#!/bin/sh

if ! git rev-parse v"$(jq '.dependencies."hapi-greenkeeper-keeper"' -r package.json)" >/dev/null 2>&1; then
  git config --global user.email "$GIT_EMAIL"
  git config --global user.name "$GIT_NAME"
  git tag v"$(jq '.dependencies."hapi-greenkeeper-keeper"' -r package.json)"
  git push --tags "https://$GH_TOKEN@github.com/greenkeeper-keeper/reference-instance" >/dev/null 2>&1
else
  echo "tag already exists"
fi

