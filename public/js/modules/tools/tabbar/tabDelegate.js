'use strict';

import eventBus from "../../../components/arcitectureElements/eventBus.js";
import tabbarEvents from "../../../models/tabbar/eventsNames.js";

class TabDelegate {
    constructor({
        parentEl = {},
        tabModel = {}
    } = {}) {
        this._tabModel = tabModel;
        this._el = parentEl.querySelector(`.${this._tabModel.jsClass}`);

        this._connectToEventBus();
    }

    _connectToEventBus() {
        // Делает вкладку активной по клику
        this._el.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._tabModel.active = true;
        });

        // Если состояние активности вкладки изменилось, то изменяется ее отображение
        eventBus.on(tabbarEvents.ACTIVE_CHANGED({
            tabbarName: this._tabModel.parentName,
            tabName: this._tabModel.name
        }), this._changeActive.bind(this));

        // Если состояние доступности вкладки изменилось, то изменяется ее отображение        
        eventBus.on(tabbarEvents.AVALIABLE_CHANGED({
            tabbarName: this._tabModel.parentName,
            tabName: this._tabModel.name
        }), this._changeAvaliable.bind(this));
    }

    _changeActive(isActive) {
        if (isActive) {
            this._el.classList.add('active');
        }
        else {
            this._el.classList.remove('active');
        }
    }

    _changeAvaliable(isAvaliable) {
        this._el.hidden = !isAvaliable;
    }
}

export default TabDelegate;