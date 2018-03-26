'use strict';

import AbstractSection from '/js/modules/tools/section/absctractSection.js';
import SMTablesModule from '../../../tools/smTablesModule/smTablesModule.js';
import tabbarsOptions from '../../../../components/globalData/tabbarsOptions.js';
import utiles from '../../../../components/utiles.js';
import eventBus from '../../../../components/arcitectureElements/eventBus.js';
import tabbarEvents from '../../../../models/tabbar/eventsNames.js';



class Scoreboard extends AbstractSection {
    render() {
        const template = window.scoreboardTmplTemplate();
        this._el.appendChild(utiles.htmlToElements(template)[0]);

        this._innderModule = new SMTablesModule(tabbarsOptions.SCOREBOARD);
        this._innderModule.render();
        this._linkInnerModule();

        this._el.querySelector('.js-scoreboard-content').appendChild(this._innderModule.element);
    }

    _linkInnerModule() {
        eventBus.on(tabbarEvents.ACTIVE_CHANGED({
            tabbarName: this._tabModel.parentName,
            tabName: this._tabModel.name
        }), (isActive) => {
            if (isActive) {
                this._innderModule.open();
            }
            else {
                this._innderModule.reset();
            }
        });
    }
}

export default Scoreboard;