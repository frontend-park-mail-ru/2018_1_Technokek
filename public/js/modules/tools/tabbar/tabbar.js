'use strict';

import tabbarEvents from "../../../models/tabbar/eventsNames.js";
import tabbarManager from "../../../models/tabbar/manager.js";
import utiles from "../../../components/utiles.js";
import TabDelegate from "./tabDelegate.js";


class Tabbar {
    constructor({
        tabbarOptions = {},
        tabbarTemplate = utiles.noop,
        tabTemplate = utiles.noop
    } = {}) {
        this._tabbarModel = tabbarManager.get(tabbarOptions);
        this._el = window.tabbarTmplTemplate(this.tabs);
        this._tabs = this._tabbarModel.tabs.map((tabModel) => 
            new TabDelegate({ parent: this, tabModel })
        );
        
    }

    get element() {
        return this._el;
    }
}

export default Tabbar;