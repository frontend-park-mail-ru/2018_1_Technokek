'use strict';

import utiles from '../../components/utiles.js';
import tabsModels from '../../models/tabsModels.js';

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
        this._el = utiles.htmlToElements(window.tabTmplTemplate({
            tab: tabModel
        }))[0];

        if (!this._tabModel.avaliable) {
            this._el.hidden = true;
        }

        this._el.addEventListener('click', (evt) => {
            clickListener(evt, this);
        });

        this._tabModel.addActiveListener(this.onActiveChanged.bind(this));
        this._tabModel.addAvaliableListener(this.onAvaliableChanged.bind(this));
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

    onAvaliableChanged() {
        this._el.hidden = !this._tabModel.avaliable;
    }

    onActiveChanged() {
        if (!this._tabModel.active) {
            this._el.classList.remove('active');
        }
        else {
            this._el.classList.add('active');
        }
    }
}

class Tabbar {
    constructor({selector = '', tabs = []} = {}) {
        this._el = document.querySelector(selector);

        this._tabsDelegates = tabsModels.map((tabModel) => {
            return new TabDelegate({
                tabModel, 
                clickListener: this._handleClick.bind(this)
            });
        });

        for(let tabDelegate of this._tabsDelegates) {
            this._el.appendChild(tabDelegate.element);
        }

        this._current = this._tabsDelegates[0];
        this._current.activate();

    }

    _handleClick(evt, tabDelegate) {
        evt.preventDefault();

        if(tabDelegate != this._current) {
            this._current.deactivate();
            tabDelegate.activate();
            this._current = tabDelegate;
        } 
    }

    render() { }
}

export default Tabbar;