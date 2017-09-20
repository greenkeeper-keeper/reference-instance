require('dotenv-safe').load();

export default {
  connections: [{
    port: process.env.PORT
  }],
  registrations: [
    {
      plugin: {
        register: 'good',
        options: {
          reporters: {
            console: [
              {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{log: '*', request: '*', response: '*', error: '*'}]
              },
              {module: 'good-console'},
              'stdout'
            ]
          }
        }
      }
    },
    {
      plugin: {
        register: 'hapi-greenkeeper-keeper',
        options: {
          github: {
            token: process.env.GITHUB_TOKEN
          },
          acceptAction: 'rebase'
        }
      }
    },
    {plugin: 'hapi-github-webhooks'},
    {plugin: './auth'}
  ]
};
