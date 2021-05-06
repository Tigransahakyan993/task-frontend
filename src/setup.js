import store from './store';
import {trailLogin} from './reducer/auth/auth';

function initApp() {
  store.dispatch(trailLogin())
}

export default initApp();