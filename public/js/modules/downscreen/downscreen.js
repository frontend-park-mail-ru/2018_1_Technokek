'use strict';

import globalData from '../../components/gloabalData.js';
import tabsModels from '../../models/tabsModels.js';
import utiles from '../../components/utiles.js';

class DownScreen {
    constructor(selector) {
        const template = window.downscreenTmplTemplate({
            sections: tabsModels
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
        this._sections = sections.map((section) => {
            return new section.sectionType(section);
        });
    }
}

export default DownScreen;