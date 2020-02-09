export const plugin = {
  async register(server, options) {
    server.auth.strategy('githubwebhook', 'githubwebhook', {secret: process.env.GITHUB_WEBHOOK_SECRET});
    server.auth.default('githubwebhook');
  },
  name: 'auth',
  dependencies: ['@travi/hapi-github-webhooks']
};
