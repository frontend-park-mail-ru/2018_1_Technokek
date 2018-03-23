'use sctrict';

import tabbarEvents from "../../../models/tabbar/eventsNames.js";
import eventBus from "../../../components/arcitectureElements/eventBus.js";

class AbstractSection {
    constructor(parentEl, tabModel) {
        this._tabModel = tabModel;
        this._el = parentEl.querySelector(`.${this._tabModel.jsClass}`);

        eventBus.on(tabbarEvents.ACTIVE_CHANGED({
            tabbarName: this._tabModel.parentName,
            tabName: this._tabModel.name
        }), (isActive) => {
            console.log('changeHidden');
            this._changeHidden(isActive);
        });

        this._changeHidden(this._tabModel.active);
    }

    render() {

    }

    _changeHidden(isActive) {
        this._el.hidden = !isActive; 
    }
}

export default AbstractSection;