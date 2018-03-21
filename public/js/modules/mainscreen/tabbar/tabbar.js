'use strict';

import utiles from '../../../components/utiles.js';
import tabsModels from '../../../models/tabsModels.js';
import profileModel from '../../../models/profile/model.js';
import eventBus from '../../../components/arcitectureElements/eventBus.js';
import profileEvents from '../../../models/profile/eventsNames.js';


class TabDelegate {
    constructor({
        tabModel = {},
        clickListener = utiles.noop
    } = {}) {
        this._tabModel = tabModel;

        const template = window.tabTmplTemplate({
            tab: tabModel
        });

        this._el = utiles.htmlToElements(template)[0];

        if (!this._tabModel.avaliable) {
            this._el.hidden = true;
        }

        this._el.addEventListener('click', (evt) => {
            clickListener(evt, this);
        });

        this._tabModel.addActiveListener(this._onActiveChanged.bind(this));
        this._tabModel.addAvaliableListener(this._onAvaliableChanged.bind(this));
    }

    get element() {
        return this._el;
    }

    deactivate() {
        this._tabModel.active = false;
    }

    activate() {
        this._tabModel.active = true;
    }

    _onAvaliableChanged() {
        this._el.hidden = !this._tabModel.avaliable;
    }

    _onActiveChanged() {
        if (!this._tabModel.active) {
            this._el.classList.remove('active');
        }
        else {
            this._el.classList.add('active');
        }
    }
}

class Tabbar {
    constructor() {
        const template = window.tabbarTmplTemplate();
        this._el = utiles.htmlToElements(template)[0];

        eventBus.on(profileEvents.AUTHORIZED(), this._openFirstTab.bind(this));
        eventBus.on(profileEvents.DEAUTHORIZED(), this._openFirstTab.bind(this));
    }

    get element() {
        return this._el;
    }

    render() {
        this._tabsDelegates = tabsModels.map((tabModel) => {
            return new TabDelegate({
                tabModel, 
                clickListener: this._handleClick.bind(this)
            });
        });

        for(let tabDelegate of this._tabsDelegates) {
            this._el.appendChild(tabDelegate.element);
        }
    
        this._openFirstTab();
    }

    _handleClick(evt, tabDelegate) {
        evt.preventDefault();

        this._scrollToTabbar();
        this._activateTab(tabDelegate);
    }

    _activateTab(tabDelegate) {
        if (!this._current) {
            tabDelegate.activate();
            this._current = tabDelegate;
        }

        else if (tabDelegate != this._current) {
            this._current.deactivate();
            tabDelegate.activate();
            this._current = tabDelegate;
        } 
    }

    _openFirstTab() {
        for (let tabDelegate of this._tabsDelegates) {
            if (!tabDelegate.element.hidden) {
                this._activateTab(tabDelegate);
                break;
            }
        }
    }

    _scrollToTabbar(name) {
        this._moveToTabbar(this._el);
    }
      
    _moveToTabbar(elem) {
        const jump = parseInt(elem.getBoundingClientRect().top * 0.3);
        document.body.scrollTop += jump;
        document.documentElement.scrollTop += jump;
        if (!elem.lastjump || elem.lastjump > Math.abs(jump)) {
            elem.lastjump = Math.abs(jump);
            setTimeout(() => this._moveToTabbar(elem), 20);
        } 
        else {
            elem.lastjump = null;
        }
    }
}

export default Tabbar;