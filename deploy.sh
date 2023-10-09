#!/bin/bash

if [ $(git rev-parse --abbrev-ref HEAD) != "dev" ]; then
	echo "You should only stage commits in the dev branch"
	exit 1
fi

git push
git checkout main
git merge dev
git push
git checkout dev