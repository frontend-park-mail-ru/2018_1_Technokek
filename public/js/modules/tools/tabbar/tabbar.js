'use strict';

import tabbarEvents from "../../../models/tabbar/eventsNames.js";
import tabbarManager from "../../../models/tabbar/manager.js";
import utiles from "../../../components/utiles.js";
import TabDelegate from "./tabDelegate.js";
import tabsStyles from "./tabsStyles.js";

class Tabbar {
    constructor({
        tabbarOptions = {},
        tabStyle = tabsStyles.TAB_LG
    } = {}) {
        this._tabbarModel = tabbarManager.get(tabbarOptions);

        const template = window.tabbarTmplTemplate({
            tabStyle,
            tabs: this._tabbarModel.tabs
        });
        this._el = utiles.htmlToElements(template)[0];
        
        this._tabs = this._tabbarModel.tabs.map((tabModel) => 
            new TabDelegate({ parentEl: this._el, tabModel })
        );
    }

    render() { }

    get element() {
        return this._el;
    }
}

export default Tabbar;