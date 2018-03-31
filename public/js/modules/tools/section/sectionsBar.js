'use strict';

import utiles from "../../../components/utiles.js";
import tabbarManager from "../../../models/tabbar/manager.js";


class SectionsBar {
    constructor({
        templateFunction = utiles.noop,
        tabbarOptions = {}
    } = {}) {
        this._tabbarModel = tabbarManager.get(tabbarOptions);

        const template = templateFunction({
            sections: this._tabbarModel.tabs
        });   
        this._el = utiles.htmlToElements(template)[0];
    }

    render() {
        if (!this._sections) {
            this._createSections();
        }

        for (let section of this._sections) {
            section.render();
        }
    }

    get element() {
        return this._el;
    }

    _createSections() {     
        this._sections = this._tabbarModel.tabs.map((section) => {
            return new section.sectionType({
                parentEl: this._el, 
                tabModel: section
            });
        });
    }
}

export default SectionsBar;