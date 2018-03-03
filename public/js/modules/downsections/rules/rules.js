'use strict';

import AbstractSection from '../abstractSection.js';

class Rules extends AbstractSection {
    render() {
        this._el.innerHTML = window.rulesTmplTemplate();
    }
}

export default Rules;