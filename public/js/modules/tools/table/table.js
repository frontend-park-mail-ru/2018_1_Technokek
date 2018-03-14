'use strict';

import utiles from '../../../components/utiles.js';

class Table {
    constructor (columnsOptions = []) {
        const template = window.tableTmplTemplate();
        this._el = utiles.htmlToElements(template)[0];
        this._columns = columnsOptions.map(option => option.title);
        this._rowsNumber = 0;
        this._generateRowTemplate(columnsOptions);
    }

    render() {
        // this._generateRowTemplate();
        this._renderHeader();
    }

    get element() {
        return this._el;
    }

    addRows(rows = []) {
        
    }

    get rowsNUmber() {
        return this._rowsNumber;
    }

    _generateRowTemplate(options) {
        console.log(options);
        this._rowTemplate = options.map( option => option.template ).join(' ');
        console.log('row template: ', this._rowTemplate);
    }

    _renderHeader() {
        const header = this._el.querySelector('.js-table-header');
        header.style['grid-template-columns'] = this._rowTemplate;
        
        console.log(this._el);
        for (let column of this._columns) {
            const template = headercellTmplTemplate({
                cell: {
                    class: `js-header-${column}`,
                    text: column
                }
            });
            console.log(template);
            const newCell = utiles.htmlToElements(template)[0];
            header.appendChild(newCell);            
        }
    }

    _renderRow(rowData) {
        const rows = this._el.querySelector('.table-rows');
        const rowArray = this._columns.map(column => rowData[column]);

        const template = tablerowTmplTemplate({ rowArray });
        const rowElement = utiles.htmlToElements(template)[0];
        rows.appendChild(rowElement);
    }
}

export default Table;