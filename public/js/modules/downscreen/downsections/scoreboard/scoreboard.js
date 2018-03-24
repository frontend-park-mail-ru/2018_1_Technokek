'use strict';

import utiles from '../../../../components/utiles.js';
import globalValues from '../../../../components/gloabalData.js';
import modes from '../../../../components/globalData/modes.js';
import eventBus from '../../../../components/arcitectureElements/eventBus.js';

import tabbarManager from '../../../../models/tabbar/manager.js';
import tabbarEvents from '../../../../models/tabbar/eventsNames.js';
import scoreboardModel from '../../../../models/scoreboardModel.js';

import * as Buttons from '../../../tools/buttons/buttons.js';
import Table from '../../../tools/table/table.js';
import AbstractSection from '/js/modules/tools/section/absctractSection.js';
import Tabbar from '../../../tools/tabbar/tabbar.js';
import tabsStyles from '../../../tools/tabbar/tabsStyles.js';
import SectionsBar from '../../../tools/section/sectionsBar.js';

import subsectionsOptions from './subsectionsOptions.js';


class Scoreboard extends AbstractSection {
    render() {
        this._tabsModel = tabbarManager.get(subsectionsOptions);
        
        const template = window.scoreboardTmplTemplate();
        this._el.appendChild(utiles.htmlToElements(template)[0]);
        
        this._renderTabbar();
        this._renderSections();
    }

    _renderTabbar() {
        this._tabbar = new Tabbar({
            tabbarOptions: subsectionsOptions,
            tabStyle: tabsStyles.TAB_SM
        });

        this._tabbar.render();
        this._el.appendChild(this._tabbar.element);
    }

    _renderSections() {
        this._sections = new SectionsBar({
            tabbarOptions: subsectionsOptions,
            templateFunction: window.subsectionsTmplTemplate
        });

        this._sections.render();
        this._el.appendChild(this._sections.element);
    }
}

export default Scoreboard;