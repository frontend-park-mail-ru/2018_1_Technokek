'use strict';

import globalData from '../../components/gloabalData.js';
import tabsModels from '../../models/tabsModels.js';

class DownScreen {
    constructor(selector) {
        this._el = document.querySelector(selector);
        this._sectionsCreated = false;
    }

    render() {
        this._el.innerHTML = window.downscreenTmplTemplate({
            sections: tabsModels
        });

        if (!this._sectionsCreated) {
            this._createSections(tabsModels);
        }

        for (let section of this._sections) {
            section.render();
        }
    }

    _createSections(sections) {
        this._sections = sections.map((section) => {
            console.log(section);
            return new section.sectionType(section);
        });

        this._sectionsCreated = true;
    }
}

export default DownScreen;