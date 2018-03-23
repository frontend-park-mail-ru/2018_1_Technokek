'use strict';

import globalData from '../../components/gloabalData.js';
import tabsModels from '../../models/tabsModels.js';
import utiles from '../../components/utiles.js';
import tabbarManager from '../../models/tabbar/manager.js';
import tabbarsOprions from '../../components/globalData/tabbarsOptions.js';

class DownScreen {
    constructor(selector) {
        this._tabbarModel = tabbarManager.get(tabbarsOprions.MAIN);

        const template = window.downscreenTmplTemplate({
            sections: this._tabbarModel.tabs
        });
        this._el = utiles.htmlToElements(template)[0];
    }

    render() {
        if (!this._sections) {
            this._createSections(tabsModels);
        }

        for (let section of this._sections) {
            section.render();
        }
    }

    get element() {
        return this._el;
    }

    _createSections(sections) {
        this._sections = this._tabbarModel.tabs.map((section) => {
            console.log(section);
            return new section.sectionType(this._el, section);
        });
    }
}

export default DownScreen;