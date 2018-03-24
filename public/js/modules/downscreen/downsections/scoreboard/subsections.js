'use sctict';

import tablesOptions from '../../../../components/globalData/tablesOptions.js';
import AbstractSection from '../../../tools/section/absctractSection.js';
import tableManager from '../../../../models/table/manager.js';
import Table from '../../../tools/table/table.js';
import { PassiveButton } from '../../../tools/buttons/buttons.js';
import eventBus from '../../../../components/arcitectureElements/eventBus.js';
import tableEvents from '../../../../models/table/eventsNames.js';

class ScoreboardSubsection extends AbstractSection {
    render() {
        this._tableModel = tableManager.get(tablesOptions.SCOREBOARD[this._tabModel.sectionData]);
        console.log(this._tableModel);
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

export default ScoreboardSubsection;