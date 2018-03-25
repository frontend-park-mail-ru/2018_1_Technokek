'use strict';

import utiles from "/js/components/utiles.js";
import historyModel from '../../../../../models/historyModel.js';
import globalValues from '../../../../../components/gloabalData.js';
import Table from '../../../../tools/table/table.js';

import * as Buttons from '../../../../tools/buttons/buttons.js';
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
}

export default HistorySection;