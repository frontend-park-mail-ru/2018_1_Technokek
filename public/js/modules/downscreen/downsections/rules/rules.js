'use strict';

import * as Buttons from '../../../tools/buttons/buttons.js';
import Table from '../../../tools/table/table.js';
import AbstractForm from '../../../tools/abstractForm/abstractForm.js';

import AbstractSection from '../abstractSection.js';
import utiles from '../../../../components/utiles.js';
import globalValues from '../../../../components/gloabalData.js';

class Rules extends AbstractSection {
    render() {
        const template = window.rulesTmplTemplate();
        this._contentBody = utiles.htmlToElements(template)[0];
        this._el.appendChild(this._contentBody);

        this._primaryBtn = new Buttons.ActiveButton({
            text: 'Primary button'
        });

        this._primaryButtonWide = new Buttons.ActiveButton({
            text: 'Primary buttin wide',
            wide: true
        });

        this._passiveBtn = new Buttons.PassiveButton({
            text: 'Primary button'
        });

        this._passiveButtonWide = new Buttons.PassiveButton({
            text: 'Primary buttin wide',
            wide: true
        });

        this._underliningButton = new Buttons.UnderliningButton({
            text: 'Underlining button',
        });
        this._underliningButton.addListeners([{
            name: 'click',
            handler: () => {
                if (!this._underliningButton.isActive) {
                    this._underliningButton.acitvate();
                }
                else {
                    this._underliningButton.deactivate();
                }
            }
        }]);

        this._table = new Table({
            columnsOptions: [
                {
                    title: 'Column1',
                    name: 'col1',
                    template: '150px'
                },
                {
                    title: 'Column2',
                    name: 'col2',
                    template: 'auto'
                },
                {
                    title: 'Column3',
                    name: 'col3',
                    template: '100px'
                },
            ]
        }),
        this._table.render();
        this._table.appendRow({
                'col1': 'Value1 row',
                'col2': 'Value2 row',
                'col3': 'Value3 row'
        });
        this._table.appendRow({
            'col1': 'Value1 row',
            'col2': 'Value2 row',
            'col3': 'Value3 row'
        });
    
        this._form1 =  new AbstractForm({
            fields: globalValues.formsOptions.nicknameForm.fields,
            fieldTemplateFunction: window.editinputTmplTemplate,
            templateFunction: window.editmodeTmplTemplate,
        });
        this._form1.render();

        this._form2 =  new AbstractForm({
            formTitle: 'Form title',
            fields: globalValues.formsOptions.nicknameForm.fields,
        });
        this._form2.render();

        this._append(this._primaryBtn);
        this._append(this._primaryButtonWide);
        this._append(this._passiveBtn);
        this._append(this._passiveButtonWide);
        this._append(this._underliningButton);
        this._append(this._table);
        this._append(this._form1);
        this._append(this._form2);
    }

    _append(child) {
        console.log(child);
        this._contentBody.appendChild(child.element);
    }
}

export default Rules;