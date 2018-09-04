# reference-instance

an [instance of a greenkeeper-keeper service](https://github.com/greenkeeper-keeper/meta#instance-deployment-options)
that can either be deployed as is to your preferred host or used as a
reference for creating your own custom instance

[![license](https://img.shields.io/github/license/greenkeeper-keeper/reference-instance.svg)](LICENSE)

[![Build Status](https://img.shields.io/travis/greenkeeper-keeper/reference-instance.svg?style=flat&branch=master)](https://travis-ci.org/greenkeeper-keeper/reference-instance)
[![Docker Build Status](https://img.shields.io/docker/build/greenkeeperkeeper/reference-instance.svg)](https://hub.docker.com/r/greenkeeperkeeper/reference-instance/builds/)

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
* `ACCEPT_ACTION` _optional_: how the contribution [should be integrated](https://github.com/greenkeeper-keeper/hapi-greenkeeper-keeper#configuration),
  once accepted

## Tagging strategy

Since this instance is intended as a reference instance of a [hapi](https://hapijs.com/)
server using the [hapi-greenkeeper-keeper](https://github.com/greenkeeper-keeper/hapi-greenkeeper-keeper)
plugin, the instance is versions solely based on the version of the plugin. Each
time a new version of the plugin is this repo is tagged with that version.

Keep in mind that other changes could be introduced to this reference instance
that do not change the version in a way that is informative related to semver.
If you need to manage updates for your server using a different strategy, you
are encouraged to include the hapi plugin in your own server instance, using
this reference only as a guide for creating your server.

## Deployment

### Docker

[![Docker Pulls](https://img.shields.io/docker/pulls/greenkeeperkeeper/reference-instance.svg)](https://hub.docker.com/r/greenkeeperkeeper/reference-instance/)
[![Latest Docker Image](https://images.microbadger.com/badges/version/greenkeeperkeeper/reference-instance.svg)](https://microbadger.com/images/greenkeeperkeeper/reference-instance)
[![Commit of Docker Image](https://images.microbadger.com/badges/commit/greenkeeperkeeper/reference-instance.svg)](https://microbadger.com/images/greenkeeperkeeper/reference-instance)
[![Docker Images Layers](https://images.microbadger.com/badges/image/greenkeeperkeeper/reference-instance.svg)](https://microbadger.com/images/greenkeeperkeeper/reference-instance)

#### Versioning strategy

Docker tags use the same versioning strategy as is outlined above for git tags.
Each git tag results in a tagged image.

### Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Since build steps have to happen on the heroku side, ensure that the `devDependencies`
are installed there by setting `NPM_CONFIG_PRODUCTION=false`

### Zeit now

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/greenkeeperkeeper/reference-instance&env=GITHUB_TOKEN&env=GITHUB_WEBHOOK_SECRET)
