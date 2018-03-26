'use strict';

import globalValues from '../../components/gloabalData.js';
import utiles from '../../components/utiles.js';

import Header from './header/header.js';
import CentralBlock from './centralBlock/centralBlock.js';
import Tabbar from '../tools/tabbar/tabbar.js';
import tabbarsOptions from '../../components/globalData/tabbarsOptions.js';
import tabbarManager from '../../models/tabbar/manager.js';
import eventBus from '../../components/arcitectureElements/eventBus.js';
import tabbarEvents from '../../models/tabbar/eventsNames.js';

class Mainscreen {
    constructor() {
        const template = window.mainscreenTmplTemplate();
        this._el = utiles.htmlToElements(template)[0];
    }

    clear() {
        this._el.innerHTML = '';
    }

    render() {
        if (!this._inners) {
            this._createInners();
        }

        for (let inner of this._inners) {
            inner.render();
        }

        this._addMoveToTabbarEvent();
    }

    get element() {
        return this._el;
    }

    _createInners() {
        this._tabbar = new Tabbar({
            tabbarOptions: tabbarsOptions.MAIN,
        });
        
        this._inners = [
            new Header(),
            new CentralBlock(),
            this._tabbar 
        ];

        for(let inner of this._inners) {
            this._el. appendChild(inner.element);
        }
    }

    // при открытии вкладки экран съезжает к таббару
    _addMoveToTabbarEvent() {
        const tabbarModel = tabbarManager.get(tabbarsOptions.MAIN);
        for (let tab of tabbarModel.tabs) {
            eventBus.on(tabbarEvents.ACTIVE_CHANGED({
                tabbarName: tabbarModel.name,
                tabName: tab.name
            }), (isActive) => {
                if (isActive) {
                    utiles.moveToElem(this._tabbar.element);
                }
            });
        }
    }
}

export default Mainscreen;