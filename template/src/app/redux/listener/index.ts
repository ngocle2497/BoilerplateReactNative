export { listenerMiddleware } from '@listener';

import { runAppListener } from './app';
import { runAuthenticationListener } from './authentication';

(() => {
  runAppListener();

  runAuthenticationListener();
})();
