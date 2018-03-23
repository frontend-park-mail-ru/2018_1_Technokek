'use strict';

import globalValues from '../../components/gloabalData.js';
import utiles from '../../components/utiles.js';

import Header from './header/header.js';
import CentralBlock from './centralBlock/centralBlock.js';
import Tabbar from './tabbar/tabbar.js';
import TabbarNew from '../tools/tabbar/tabbarNew.js';
import tabbarsOprions from '../../components/globalData/tabbarsOptions.js';

class Mainscreen {
    constructor() {
        const template = window.mainscreenTmplTemplate();
        this._el = utiles.htmlToElements(template)[0];
    }

    clear() {
        this._el.innerHTML = '';
    }

    render() {
        if (!this._inners) {
            this._createInners();
        }

        for (let inner of this._inners) {
            inner.render();
        }
    }

    get element() {
        return this._el;
    }

    _createInners() {
        this._inners = [
            new Header(),
            new CentralBlock(),
            new Tabbar(),
            new TabbarNew({
                tabbarOptions: tabbarsOprions.MAIN,
            })
        ];

        for(let inner of this._inners) {
            this._el. appendChild(inner.element);
        }
    }
}

export default Mainscreen;