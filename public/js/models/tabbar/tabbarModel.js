'use sctrict';


import TabModel from "./tabModel.js";
import eventBus from "../../components/arcitectureElements/eventBus.js";
import tabbarEvents from "./eventsNames.js";


class TabbarModel {
    constructor(tabbarOptions) {
        this._name = tabbarOptions.name;
        this._createTabs(tabbarOptions.tabs);
    }

    get name() {
        return this._name;
    }

    get tabs() {
        return this._tabs;
    }

    _createTabs(tabs) {
        this._tabs = tabs.map(tab => 
            new TabModel({
                name: tab.name,
                title: tab.title,
                active: tab.active,
                avaliable: title.avaliable,
                sctionType: tab.sectionType,
                dependsOnAuth: tab.authDepends,
                parentName: this._name
            })
        );

        this._connectToEventBus();           
    }

    _connectToEventBus() {
        for (let tab of this._tabs) {
            this._connectWithTab(tab);
        }
    }

    _connectWithTab(tab) {
        eventBus.on(
            tabbarEvents.ACTIVE_CHANGED(this._name, tab.name), 
            (isActive) => this._changeActive(tab)
        );

        eventBus.on(
            tabbarEvents.AVALIABLE_CHANGED(this.name, tab.name),
            (isAvaliable) => this._changeAvaliable(tab)
        );
    }

    _changeActive(newCurTab) {
        if (newCurTab.isActive) {
            this._curTab = newCurTab;
            this._deactivateAll(this._curTab);
        }
        else {
            if (!this._curTab || this._curTab === newCurTab) {
                this._curTab = this._getFirstAvaliable(tab);
                this._curTab.active = true;
            }
        }
    }

    _changeAvaliable(newAvaliable) {
        if (tab.isAvaliable) {
            const firstAvaliable = this._getFirstAvaliable();
            if (firstAvaliable === newAvaliable) {
                newAvaliable.active = true;
            }
        }
    }

    _deactivateAll(notEqToTab) {
        for (let tab of this._tabs) {
            if (!notEqToTab || notEqToTab !== tab) {
                tab.active = false;
            }
        }
    }

    _getFirstAvaliable(notEqToTab) {
        for (let tab of this._tabs) {
            if (tab.avaliable && (!notEqToTab || notEqToTab !== tab)) {
                return tab;
            }
        }
    }
}

export default TabbarModel;