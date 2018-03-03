'use strict';

import AbstractSection from '../abstractSection.js';

class Scoreboard extends AbstractSection{
    render() {
        this._el.innerHTML = window.scoreboardTmplTemplate();
    }
}

export default Scoreboard;