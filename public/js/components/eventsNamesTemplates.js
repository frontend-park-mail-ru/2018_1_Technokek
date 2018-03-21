'use strict';

import eventsTypes from './eventsTypes.js';

const eventsNamesTemplates = {};


// Шаблон именования событий для таббара
eventsNamesTemplates[eventsTypes.TABBAR] = 
    ({tabbarName = '', tabName = '', actionName = ''} = {}) => 
        `/tabbar:${tabbarName}/tab:${tabName}/action:${actionName}`;


// Шаблон именования событий об изменении данных
eventsNamesTemplates[eventsTypes.DATA_CHANGED] = 
    ({dataOwnerName = ''} = {}) => 
        `/dataChanged/${dataOwnerName}`;


// Шаблоны именования событий юзера
eventsNamesTemplates[eventsTypes.USER] =  {
    

};


export default eventsNamesTemplates;