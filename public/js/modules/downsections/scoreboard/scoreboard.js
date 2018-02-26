'use strict';

class Scoreboard {
    constructor(selector) {
        this._el = document.querySelector(selector);
    }

    render() {
        this._el.innerHTML = window.scoreboardTmplTemplate();
    }
}

export default Scoreboard;