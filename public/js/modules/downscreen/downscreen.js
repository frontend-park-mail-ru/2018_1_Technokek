'use strict';

// import Rules from '../downsections/rules/rules.js';
// import Profile from '../downsections/profile/profile.js';
// import Scoreboard from '../downsections/scoreboard/scoreboard.js';
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
        this._sections = [];
        for(let section of globalData.initialTabs) {
            let current = new section.sectionSelect('.' + section.jsClass);
            this._sections.push(current);
        }
        this._sectionsCreated = true;
    }
}

export default DownScreen;