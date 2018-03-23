'use sctrict';

import TabbarModel from "./tabbarModel.js";

class TabbarManager {
    constructor() {
        if (TabbarManager.__instance) {
            return TabbarManager.__instance;
        }

        this._tabbars = {};

        TabbarManager.__instance = this;
    }

    get(tabbarOptions) {
        if (!this._tabbars[tabbarOptions.name]) {
            this._tabbars[tabbarOptions.name] = new TabbarModel(tabbarOptions);
        }

        return this._tabbars[tabbarOptions.name];
    }
}

const tabbarManager = new TabbarManager();

export default tabbarManager;