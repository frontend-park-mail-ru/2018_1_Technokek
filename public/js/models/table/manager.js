'use sctrict';

import TableModel from "./model.js";

class TableManager {
    constructor() {
        if (TableManager.__instance) {
            return TableManager.__instance;
        }

        this._tables = {};

        TableManager.__instance = this;
    }

    get(tableOptions) {
        if (!this._tables[tableOptions.name]) {
            this._tables[tableOptions.name] = new TableModel(tableOptions);
        }

        return this._tables[tableOptions.name];
    }
}

const tableManager = new TableManager();

export default tableManager;