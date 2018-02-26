'use strict';

const getLinkedSection = function(tabElement) {
    const linkedSection = tabElement.dataset.section;
    console.log(linkedSection);
    
    const el = document.getElementsByClassName(linkedSection)[0];
    console.log(el);
    return el;
};

class Tabbar {
    constructor({selector = '', tabs = []} = {}) {
        this._el = document.querySelector(selector);
        this._tabs = tabs.map((tab) => {
            let {title, jsClass, _} = tab;
            return {
                title,
                jsClass,
                active: false
            };
        });
    
        if(this._tabs) {
            this._tabs[0].active = true;
            // getLinkedSection(this._currentTab).hidden = false;
        }
    
        let _listenersCreated = false;
    }

    render() {
        this._el.innerHTML = window.tabbarTmplTemplate({
            tabs: this._tabs
        });

        this._tabElements = this._el.querySelectorAll('.tabbar-item');
        for(let tabElement of this._tabElements) {
            if(tabElement.classList.contains('active'))
                this._currentTab = tabElement;
        }

        if(!this._listenersCreated)
            this._createListeners();
    }

    _createListeners() {
        for(let tabElement of this._tabElements) {
            tabElement.addEventListener('click', (evt) => {
                this._tabClickedHandler(evt, tabElement);
            });
        }   

        this._listenersCreated = true;
    }

    _tabClickedHandler(evt, tabElement) {
        evt.preventDefault();
        this._currentTab.classList.remove('active');
        tabElement.classList.add('active');

        getLinkedSection(this._currentTab).hidden = true;
        getLinkedSection(tabElement).hidden = false;

        this._currentTab = tabElement;
    }
}

export default Tabbar;