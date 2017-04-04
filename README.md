# reference-instance

an [instance of a greenkeeper-keeper service](https://github.com/greenkeeper-keeper/meta#instance-deployment-options)
that can either be deployed as is to your preferred host or used as a
reference for creating your own custom instance

[![license](https://img.shields.io/github/license/greenkeeper-keeper/reference-instance.svg)](LICENSE)

[![Build Status](https://img.shields.io/travis/greenkeeper-keeper/reference-instance.svg?style=flat&branch=master)](https://travis-ci.org/greenkeeper-keeper/reference-instance)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![greenkeeper badge](https://badges.greenkeeper.io/greenkeeper-keeper/reference-instance.svg)

## Configuration

config for this instance is expected through environment variables and
provides the necessary [details for the underlying hapi plugin](https://github.com/greenkeeper-keeper/hapi-greenkeeper-keeper#configuration)
as well as for ensuring the webhooks are really from GitHub

The required variables are enforced at startup by [dotenv-safe](https://github.com/rolodato/dotenv-safe)
and are defined in [`.env.example`](./.env.example)

* `PORT`: the port that the instance should listen on (might be defined
  automatically by your host)
* `GITHUB_TOKEN`: [personal access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/)
  for the account intended to accept the greenkeeper PRs

  _Note_: the personal access token will need the `repo` and `repo:read_hooks`
  scopes in order to work properly
* `GITHUB_WEBHOOK_SECRET`: a secret used to [secure your webhooks](https://developer.github.com/webhooks/securing/)
  which must match the secret used for the webhook defined for each repo
