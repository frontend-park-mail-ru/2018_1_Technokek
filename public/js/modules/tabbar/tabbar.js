'use strict';

const getLinkedSection = function(tabElement) {
    const linkedSection = tabElement.dataset.section;
    const el = window.document.getElementsByClassName(linkedSection);
    return el[0];
};

class Tabbar {
    constructor({selector = '', tabs = []} = {}) {
        this._el = document.querySelector(selector);
        this._tabs = tabs.map((tab) => {
            const {title, jsClass, _} = tab;
            return {
                title,
                jsClass,
                active: false
            };
        });

        this._currentTab = null;
    }

    render() {
        this._el.innerHTML = window.tabbarTmplTemplate({
            tabs: this._tabs
        });

        if(!this._tabElements) {
            this._elementizeTabs(); 
        }
    }

    _elementizeTabs() {
        this._tabElements = this._el.querySelectorAll('.tabbar-item');
        this._createListeners();
        this._updateTabElement(this._tabElements[0]);
    }

    _createListeners() {
        for(let tabElement of this._tabElements) {
            tabElement.addEventListener('click', (evt) => {
                this._handleTabClick(evt, tabElement);
            });
        }   
    }

    _handleTabClick(evt, tabElement) {
        evt.preventDefault();
        this._updateTabElement(tabElement);
    }

    _updateTabElement(tabElement) {
        if(this._currentTab){
            this._currentTab.classList.remove('active');        
            getLinkedSection(this._currentTab).hidden = true;
        }

        getLinkedSection(tabElement).hidden = false;
        tabElement.classList.add('active');

        this._currentTab = tabElement;
    }
}

export default Tabbar;