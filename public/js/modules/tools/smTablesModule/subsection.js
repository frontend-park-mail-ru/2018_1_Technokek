'use sctrict';

import AbstractSection from "../section/absctractSection.js";
import tableManager from "../../../models/table/manager.js";
import tablesOptions from "../../../components/globalData/tablesOptions.js";
import Table from "../table/table.js";
import { PassiveButton } from "../buttons/buttons.js";

class SMSubsection extends AbstractSection{
    render() {


        this._tableModel = 
            tableManager.get(this._tabModel.sectionData.table);
        this._table = new Table(this._tableModel);
        this._table.render();
        this._el.appendChild(this._table.element);

        this._loadMoreBtn = new PassiveButton({
            text: 'Loade more',
            wide: true,
            events: [{
                name: 'click',
                handler: (evt) => {
                    this._tableModel.loadNextPage();
                }
            }]
        });
        this._el.appendChild(this._loadMoreBtn.element);
    }    
}  

export default SMSubsection;