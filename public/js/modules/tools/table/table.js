'use strict';

import utiles from '../../../components/utiles.js';
import eventBus from '../../../components/arcitectureElements/eventBus.js';
import tableEvents from '../../../models/table/eventsNames.js';


class Table {
    constructor (tableModel) {
        const template = window.tableTmplTemplate();
        this._el = utiles.htmlToElements(template)[0];
        this._tableModel = tableModel;
        this._rowsCount = 0;
    }

    render() {
        this._generateRowTemplate();
        this._renderHeader();
        this._connectToTableModel();
    }

    get element() {
        return this._el;
    }

    clear() {
        const rows = this._el.querySelector(`.js-table-rows`);
        while (rows.firstChild) {
            rows.removeChild(rows.firstChild);
        }
    }

    extendRows(rows = []) {
        for (let row of rows) {
            this._renderRow(row);
        }
    }

    appendRow(row) {
        this._renderRow(row);
    }

    get rowsCount() {
        return this._rowsCount;
    }

    _generateRowTemplate() {
        console.log(this._tableModel.columns);
        this._rowTemplate = this._tableModel.columns.map( option => option.template ).join(' ');
    }

    _renderHeader() {
        const header = this._el.querySelector('.js-table-header');
        header.style['grid-template-columns'] = this._rowTemplate;
        
        for (let column of this._tableModel.columns) {
            const template = window.headercellTmplTemplate({
                cell: {
                    class: `js-header-${column.name}`,
                    text: column.title
                }
            });
            const newCell = utiles.htmlToElements(template)[0];
            header.appendChild(newCell);            
        }
    }

    _renderRow(rowData) {
        const rows = this._el.querySelector(`.js-table-rows`);
        const rowArray = this._tableModel.columns.map(column => rowData[column.name]);

        const template = window.tablerowTmplTemplate({ rowArray });
        const rowElement = utiles.htmlToElements(template)[0];

        rowElement.style['grid-template-columns'] = this._rowTemplate;

        rows.appendChild(rowElement);

        this._rowsCount++;
    }

    _connectToTableModel() {
        eventBus.on(tableEvents.DATA_CHANGED(this._tableModel.name), (rows) => {
            this.clear();
            this.extendRows(rows);
        });

        // Загрузить данные в первый раз
        this.clear();
        this.extendRows(this._tableModel.rows);
    }
}

export default Table;