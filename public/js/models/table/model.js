'use strict';


import httpRequester from "../../components/http.js";
import utiles from "../../components/utiles.js";
import eventBus from "../../components/arcitectureElements/eventBus.js";
import tableEvents from "./eventsNames.js";


class TableModel {
    constructor(tableOptions) {
        this._name = tableOptions.name;
        this._pageLoadUrlFunc = tableOptions.urlFunc;
        
        this._columns = tableOptions.columns;

        this._rows = [];
        this._curPage = 0;
    }
    
    clear() {
        this._rows = [];
        this._curPage = 0;

        eventBus.call(tableEvents.DATA_CHANGED(this._name), this.rows);
    }

    get name() {
        return this._name;
    }

    get rows() {
        return this._rows;
    }
    
    get pagesCount() {
        return this._curPage;
    }

    get columns() {
        return this._columns;
    }

    loadNextPage() {
        httpRequester.doGet({
            url: this._pageLoadUrlFunc({page: this._curPage + 1}),
            callback: (err, resp) => {
                if (!err) {
                    this._addRows(resp);
                }
            }
        });
    }

    _addRows(rows) {
        // Явно отсеивается возможный мусор
        // и отфильтровываются только настоящие поля

        for (let row of rows) {
            const newRow = {};
            for (let column of this._columns) {
                newRow[column.name] = row[column.name] ? row[column.name] : '';
            }
            this._rows.push(newRow);
        }

        this._curPage += 1;
        eventBus.call(tableEvents.DATA_CHANGED(this._name), this._rows);
    }
}


export default TableModel;