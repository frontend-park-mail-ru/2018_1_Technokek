'use strict';

import Init from './modules/init/init.js';
import profileModel from './models/profile/model.js';

const init = new Init('body');
init.render();
profileModel.checkAuth();
