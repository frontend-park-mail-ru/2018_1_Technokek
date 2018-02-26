'use strict';

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
        if(this._tabs)
            this._tabs[0].active = true;
    }

    render() {
        this._el.innerHTML = window.tabbarTmplTemplate({
            tabs: this._tabs
        });
    }
}

export default Tabbar;