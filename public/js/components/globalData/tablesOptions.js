'use sctrict';

import modes from "./modes.js";
import globalValues from "../gloabalData.js";
import tablesNames from "./tablesNames.js";

const tablesOptions = {
    [tablesNames.SCOREBOARD]: {
        [modes.SP]: {
            name: `scoreboard/${modes.SP}`,
            urlFunc: ({page = 1} = {}) => globalValues.apiUrls.GET.SCOREBOARD({
                mode: modes.SP,
                page
            }),
            columns: [
                {
                    title: '#',
                    name: 'index',
                    template: '60px'
                },
                {
                    title: 'Nickname',
                    name: 'nickname',
                    template: 'auto'
                },
                {
                    title: 'Score',
                    name: 'score',
                    template: '110px'
                }
            ]
        },
        [modes.MP]: {
            name: `scoreboard/${modes.MP}`,
            urlFunc: ({page = 1} = {}) => globalValues.apiUrls.GET.SCOREBOARD({
                mode: modes.MP,
                page
            }),
            columns: [
                {
                    title: '#',
                    name: 'index',
                    template: '60px'
                },
                {
                    title: 'Nickname',
                    name: 'nickname1',
                    template: 'minmax(30%, 40%)'
                },
                {
                    title: 'Nickname',
                    name: 'nickname2',
                    template: 'minmax(30%, 40%)'
                },
                {
                    title: 'Score',
                    name: 'score',
                    template: 'minmax(90px, auto)'
                }
            ]
        }
    },
    [tablesNames.HISTORY]: {
        [modes.SP]: {
            name: `history/${modes.SP}`,
            urlFunc: ({page = 1} = {}) => globalValues.apiUrls.GET.HISTORY({
                mode: modes.SP,
                page
            }),
            fields: [
                {
                    title: '#',
                    name: 'index',
                    template: '60px'
                },
                {
                    title: 'Date',
                    name: 'date',
                    template: 'auto'
                },
                {
                    title: 'Score',
                    name: 'score',
                    template: '120px'
                }
            ]
        },
        [modes.MP]: {
            name: `history/${modes.MP}`,
            urlFunc: ({page = 1} = {}) => globalValues.apiUrls.GET.HISTORY({
                mode: modes.MP,
                page
            }),
            fields: [
                {
                    title: '#',
                    name: 'index',
                    template: '60px'
                },
                {
                    title: 'Date',
                    name: 'date',
                    template: '120px'
                },
                {  
                    title: 'Partner',
                    name: 'partner',
                    template: 'auto'
                },
                {
                    title: 'Score',
                    name: 'score',
                    template: '120px'
                }
            ]
        }
    }
};

export default tablesOptions;