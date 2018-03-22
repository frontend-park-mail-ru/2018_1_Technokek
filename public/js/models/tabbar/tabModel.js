
'use sctrict';

import eventBus from "../../components/arcitectureElements/eventBus.js";
import tabbarEvents from "./eventsNames.js";
import profileEvents from "../profile/eventsNames.js";
import profileModel from "../profile/model.js";

class TabModel {
    constructor ({
        title = '',
        active = false,
        avaliable = true,
        name = '',
        sctionType = Object,
        dependsOnAuth = false,
        parentName = ''
    } = {}) {
        this._name = name;
        this._sectionType = sectionType;
        this._parentName = parentName;
        this._dependsOnAuth = dependsOnAuth;

        // call setters
        this.title = title;
        this.active = active;
        if (this._dependsOnAuth) {
            this.avaliable = profileModel.authenticated;
        }
        else {
            this.avaliable = avaliable;
        }

        this._connectToEventBus();        
    }

// ---------------------------------------------------------------------------------
// getters
// ---------------------------------------------------------------------------------

    get active() {
        return this._isActive;
    }

    get avaliable() {
        return this._isAvaliable;
    }

    get title() {
        return this._title;
    }

    get name() {
        return this._name;
    }

    get parentName() {
        return this._parentName;
    }

    get dependsOnAuth() {
        return this._dependsOnAuth;
    }

    get sctionType() {
        return this._sectionType;
    }

    get jsClass() {
        return `js-${this._parentName}-${this._name}-section`;
    }

// ---------------------------------------------------------------------------------
// setters
// --------------------------------------------------------------------------------- 

    set active(isActive) {
        this._setProperty('_isActive', Boolean(isActive), tabbarEvents.ACTIVE_CHANGED);
    }
    
    set avaliable(isAvaliable) {
        this._setProperty('_isAvaliable', Boolean(isAvaliable), tabbarEvents.AVALIABLE_CHANGED);
    }

    set title(newTitle) {
        this._setProperty('_title', newTitle, tabbarEvents.TITLE_CHANGED);
    }

    _setProperty(propertyName, value, eventTemplate) {
        if (!this[propertyName] || this[propertyName] != value) {
            this[propertyName] = value;
            
            eventBus.call(
                eventTemplate({
                    tabbarName: this._parentName,
                    tabName: this._name
                }),
                value
            );
        }
    }

// ---------------------------------------------------------------------------------
// connections
// ---------------------------------------------------------------------------------     
    _connectToEventBus() {
        if (this._dependsOnAuth) {
            eventBus.on(profileEvents.AUTHORIZED(), () => {
                this.avaliable = true;
            });
            eventBus.on(profileEvents.DEAUTHORIZED(), () => {
                this.avaliable = false;
            });
        }
    }
}

export default TabModel;