'use strict';

import Init from './modules/init/init.js';
import profileModel from './models/profileModel.js';

const init = new Init('body');
init.render();
profileModel.checkAuth();
