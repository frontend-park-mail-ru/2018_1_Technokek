'use sctrict';

import AbstractSection from "../section/absctractSection.js";
import tableManager from "../../../models/table/manager.js";
import tablesOptions from "../../../components/globalData/tablesOptions.js";
import Table from "../table/table.js";
import { PassiveButton } from "../buttons/buttons.js";
import eventBus from "../../../components/arcitectureElements/eventBus.js";
import tabbarEvents from "../../../models/tabbar/eventsNames.js";

class SMSubsection extends AbstractSection{
    render() {
        this._initTable();

        this._loadMoreBtn = new PassiveButton({
            text: 'Loade more',
            wide: true,
            events: [{
                name: 'click',
                handler: (evt) => {
                    evt.preventDefault();
                    this._tableModel.loadNextPage();
                }
            }]
        });
        this._el.appendChild(this._loadMoreBtn.element);
    }

    _initTable() {
        this._tableModel = tableManager.get(this._tabModel.sectionData.table);
        this._table = new Table(this._tableModel);
        this._table.render();
        this._el.appendChild(this._table.element);
        this._linkTable();
    }

    _linkTable() {
        eventBus.on(tabbarEvents.ACTIVE_CHANGED({
            tabbarName: this._tabModel.parentName,
            tabName: this._tabModel.name
        }), this._reloadTable.bind(this));
    }

    _reloadTable(isActive) {
        console.log(`reload table: ${this._tableModel.name}`);
        if (!isActive) {
            this._tableModel.clear();
        }
        else {
            this._tableModel.loadNextPage();
        }
    }
}  

export default SMSubsection;