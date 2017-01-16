import Glue from 'glue';
import manifest from './manifest';

export default Glue.compose(manifest, {relativeTo: __dirname}).then(server => server.start().then(() => {
  server.log(['startup'], `Server started at http://${server.info.address}:${server.info.port}`);
  return server;
}));
