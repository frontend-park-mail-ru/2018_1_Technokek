'use strict';

import utiles from '../../../components/utiles.js';
import tabsModels from '../../../models/tabsModels.js';
import profileModel from '../../../models/profileModel.js';

const getLinkedSection = function(tabElement) {
    const linkedSection = tabElement.dataset.section;
    const el = window.document.getElementsByClassName(linkedSection);
    return el[0];
};

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

        profileModel.addAuthListener(this._openFirstTab.bind(this));
        profileModel.addDeauthListener(this._openFirstTab.bind(this));
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
                tabDelegate.element.click();
                break;
            }
        }
    }
}

export default Tabbar;