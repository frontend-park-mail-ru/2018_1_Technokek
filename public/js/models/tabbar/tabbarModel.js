'use sctrict';


import TabModel from "./tabModel.js";
import eventBus from "../../components/arcitectureElements/eventBus.js";
import tabbarEvents from "./eventsNames.js";


class TabbarModel {
    constructor(tabbarOptions) {
        this._name = tabbarOptions.name;
        this._createTabs(tabbarOptions.tabs);

        this._curTab = this._getFirstAvaliable();
        this._curTab.active = true;
    }

    get name() {
        return this._name;
    }

    get tabs() {
        return this._tabs;
    }

    deactivateAll() {
        for (let tab of this._tabs) {
            tab.active = false;
        }
    }

    activateFirst() {
        this.deactivateAll();
        for (let tab of this._tabs) {
            if (tab.avaliable) {
                tab.active = true;
                this._curTab = tab;
                break;
            }
        }
    }

    _createTabs(tabs) {
        this._tabs = tabs.map(tab => 
            new TabModel({
                name: tab.name,
                title: tab.title,
                active: tab.active,
                avaliable: tab.avaliable,
                dependsOnAuth: tab.authDepends,
                parentName: this._name,
                sectionType: tab.sectionType,
                sectionData: tab.sectionData
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
            tabbarEvents.ACTIVE_CHANGED({
                tabbarName: this._name, 
                tabName: tab.name
            }), 
            (isActive) => this._changeActive(tab)
        );

        eventBus.on(
            tabbarEvents.AVALIABLE_CHANGED({
                tabbarName: this._name, 
                tabName: tab.name
            }),
            (isAvaliable) => this._changeAvaliable(tab)
        );
    }

    _changeActive(newCurTab) {
        if (newCurTab.active) {
            this._curTab = newCurTab;
            this._deactivateNotCur();
        }
        if (!newCurTab.active && this._curTab === newCurTab) {
            this._curTab = null;
        }
    }

    _changeAvaliable(newAvaliable) {
        if (newAvaliable.avaliable) {
            const firstAvaliable = this._getFirstAvaliable();
            if (firstAvaliable === newAvaliable) {
                newAvaliable.active = true;
            }
        }
        else {
            if (this._curTab === newAvaliable) {
                this._curTab = this._getFirstAvaliable();
                this._curTab.active = true;
            }
        }
    }

    _deactivateNotCur() {
        for (let tab of this._tabs) {
            if (tab.active && (!this._curTab || this._curTab !== tab)) {
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