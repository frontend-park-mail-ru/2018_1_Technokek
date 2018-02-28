'use strict';

import globalData from '../../components/gloabalData.js';

class DownScreen {
    constructor(selector) {
        this._el = document.querySelector(selector);
        this._sectionsCreated = false;
    }

    render() {
        this._el.innerHTML = window.downscreenTmplTemplate({
            sections: globalData.initialTabs
        });

        if(!this._sectionsCreated) {
            this._createSections(globalData.initialTabs);
        }

        for(let section of this._sections) {
            section.render();
        }
    }

    _createSections(sections) {
        this._sections = globalData.initialTabs.map((section) => {
            return new section.sectionSelect(`.${section.jsClass}`);
        });

        this._sectionsCreated = true;
    }
}

export default DownScreen;