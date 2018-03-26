'use sctrict';

import tabbarManager from "../../../models/tabbar/manager.js";
import utiles from "../../../components/utiles.js";
import Tabbar from "../tabbar/tabbar.js";
import tabsStyles from "../tabbar/tabsStyles.js";
import SectionsBar from "../section/sectionsBar.js";

class SMTablesModule {
    constructor(tabbarOptions) {
        this._tabbarOptions = tabbarOptions;
        this._tabbarModel = tabbarManager.get(this._tabbarOptions);
        const template = window.smtablesmoduleTmplTemplate();
        this._el = utiles.htmlToElements(template)[0];
    }

    get element() {
        return this._el;
    }

    render() {
        this._renderTabbar();
        this._renderSections();
    }

    reset() {
        this._tabbarModel.deactivateAll();
    }

    open() {
        this._tabbarModel.activateFirst();
    }

    _renderTabbar() {
        this._tabbar = new Tabbar({
            tabbarOptions: this._tabbarOptions,
            tabStyle: tabsStyles.TAB_SM
        });

        this._tabbar.render();
        this._el.appendChild(this._tabbar.element);
    }

    _renderSections() {
        this._sections = new SectionsBar({
            tabbarOptions: this._tabbarOptions,
            templateFunction: window.smsubsectionsTmplTemplate
        });

        this._sections.render();
        this._el.appendChild(this._sections.element);
    }
}

export default SMTablesModule;