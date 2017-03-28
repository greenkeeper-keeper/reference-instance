export function register(server, options, next) {
  server.auth.strategy('githubwebhook', 'githubwebhook', 'required', {secret: process.env.GITHUB_WEBHOOK_SECRET});

  next();
}

register.attributes = {
  name: 'auth',
  dependencies: ['hapi-github-webhooks']
};
