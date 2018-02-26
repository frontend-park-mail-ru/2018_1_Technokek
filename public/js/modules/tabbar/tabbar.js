'use strict';

class Tabbar {
    constructor({selector = '', tabs = []} = {}) {
        this._el = document.querySelector(selector);
        this._tabs = tabs.map((tab) => {
            return {
                title: tab,
                active: ''
            };
        });
        if(this._tabs)
            this._tabs[0].active = 'active';
    }

    render() {
        console.log(this._tabs);
        this._el.innerHTML = window.tabbarTmplTemplate({
            tabs: this._tabs
        });
    }
}

export default Tabbar;