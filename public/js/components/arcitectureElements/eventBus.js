'use strict';

export default class EventBus {
    constructor() {
        if (EventBus.__instance) {
            return EventBus.__instance;
        }

        this._events = {};

        EventBus.__instance = this;
    }

    on(eventName, callback) {
        if (!this._events[eventName]) {
            this._events[eventName] = [];
        }

        for (let _callback of this._events[eventName]) {
            if (_callback === callback) {
                return;
            }
        }

        this._events[eventName].push(callback);
    }

    off(eventName, callback) {

        const eventsContainer = this._events[eventName];

        if (eventsContainer) {
            for (let i = 0; i < eventsContainer.length; i++) {
                if (eventsContainer[i] === callback) {
                    eventsContainer.splice(i, 1);
                    break;
                }
            }
        }
    }

    call(eventName, eventData) {
        for (let callback of this._events[eventName]) {
            callback(eventData);
        }
    }
}

const EventsTypes = {
    TABBAR: "tabbar",
    DATA_CHANGED: "dataChanged",
    // и так далее ...
};

const EventsNamesTemplates = {
    'tabbar': ({tabbarName = '', tabName = '', actionName = ''} = {}) => `tabbar:${tabbarName}/tab:${tabName}/action:${actionName}`,
    'dataChanged': (emitterName) => `dataChanged:${emitterName}`,
    // и так далее ...
};

EventsNamesTemplates[EventsTypes.TABBAR]({
    tabbarName: '', tabName: '', actionName: ''
});

