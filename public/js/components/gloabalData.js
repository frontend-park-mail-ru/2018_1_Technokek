'use strict';

class GlobalValues {
    get initialTabs() {
        return [
            'Rules',
            'Scoreboard'
        ];
    }
}

window.GlobalValues = new GlobalValues();

export default GlobalValues;