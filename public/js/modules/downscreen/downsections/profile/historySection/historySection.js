'use strict';

import utiles from "/js/components/utiles.js";

import SMTablesModule from "../../../../tools/smTablesModule/smTablesModule.js";
import tabbarsOptions from "../../../../../components/globalData/tabbarsOptions.js";

class HistorySection {
    render() {
        const template = window.historysectionTmplTemplate();
        this._el = utiles.htmlToElements(template)[0];

        this._innerSections = new SMTablesModule(tabbarsOptions.HISTORY);
        this._innerSections.render();

        this._el.appendChild(this._innerSections.element);
    }

    get element() {
        return this._el;
    }

    switch(isHidden) {
        if (isHidden) {
            this._innerSections.reset();
        }
        else {
            this._innerSections.open();
        }
    }
}

export default HistorySection;