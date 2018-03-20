'use strict';

import utiles from '../../../components/utiles.js';

class Table {
    constructor ({
        columnsOptions = [],
        blocksCount = 1
    }) {
        const template = window.tableTmplTemplate({ blocksCount });
        this._el = utiles.htmlToElements(template)[0];
        this._columns = columnsOptions;
        this._rowsCount = 0;
        this._blocksCount = blocksCount;
    }

    render() {
        this._generateRowTemplate();
        this._renderHeader();
    }

    get element() {
        return this._el;
    }

    clear() {
        for (let i = 1; i <= this._blocksCount; i++) {
            const block = this._el.querySelector(`.js-table-rows-${i}`);
            while (block.firstChild) {
                block.removeChild(block.firstChild);
            }
        }
    }

    extendRows(rows = [], blockNumber = 1) {
        if (blockNumber <= this._blocksCount) {
            for (let row of rows) {
                this._renderRow(row);
            }
        }
    }

    appendRow(row, blockNumber = 1) {
        if (blockNumber <= this._blocksCount) {
            this._renderRow(row);
        }
    }

    get rowsCount() {
        return this._rowsCount;
    }

    _generateRowTemplate() {
        this._rowTemplate = this._columns.map( option => option.template ).join(' ');
    }

    _renderHeader() {
        const header = this._el.querySelector('.js-table-header');
        header.style['grid-template-columns'] = this._rowTemplate;
        
        for (let column of this._columns) {
            const template = headercellTmplTemplate({
                cell: {
                    class: `js-header-${column.name}`,
                    text: column.title
                }
            });
            const newCell = utiles.htmlToElements(template)[0];
            header.appendChild(newCell);            
        }
    }

    _renderRow(rowData, blcokNumber = 1) {
        const rows = this._el.querySelector(`.js-table-rows-${blcokNumber}`);
        const rowArray = this._columns.map(column => rowData[column.name]);
        
        console.log(rowData, rowArray);

        const template = tablerowTmplTemplate({ rowArray });
        const rowElement = utiles.htmlToElements(template)[0];

        rowElement.style['grid-template-columns'] = this._rowTemplate;

        rows.appendChild(rowElement);

        this._rowsCount++;
    }
}

export default Table;