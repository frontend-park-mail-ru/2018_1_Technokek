'use strict';

import Init from './modules/init/init.js';
import profileModel from './models/profile/model.js';
import httpRequester from './components/http.js';

const init = new Init('body');
init.render();
profileModel.checkAuth();

httpRequester.doGet({
    url: 'https://technokek2018.herokuapp.com/user/1',
    callback: (err, resp) => {
        console.log(err, resp);
    }
});
