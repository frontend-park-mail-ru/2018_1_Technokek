'use strict';

import tabbarEvents from "../../../models/tabbar/eventsNames.js";
import tabbarManager from "../../../models/tabbar/manager.js";
import utiles from "../../../components/utiles.js";
import TabNewDelegate from "./tabNewDelegate.js";


class TabbarNew {
    constructor({
        tabbarOptions = {},
        tabbarTemplate = utiles.noop,
        tabTemplate = utiles.noop
    } = {}) {
        this._tabbarModel = tabbarManager.get(tabbarOptions);

        const template = window.tabbarnewTmplTemplate({
            tabStyle: 'tabbar-item',
            tabs: this._tabbarModel.tabs
        });

        this._el = utiles.htmlToElements(template)[0];
        this._tabs = this._tabbarModel.tabs.map((tabModel) => 
            new TabNewDelegate({ parentEl: this._el, tabModel })
        );
    }

    render() {

    }

    get element() {
        return this._el;
    }
}

export default TabbarNew;