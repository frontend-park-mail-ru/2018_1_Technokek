'use sctrict';


const TITLE_CHANGED_NAME = 'title';
const ACTIVE_CHANGED_NAME = 'active';
const AVALIABLE_CHANGED_NAME = 'avaliable';


const _tabbarEventsTemplate = ({
    tabbarName = '',
    tabName = '',
    actionName = ''
} = {}) => 
    `/tabbar:${tabbarName}/${tabName}/changed:${actionName}`;


// Шаблоны событий таббара
const tabbarEvents = {
    // Изменение заголовка
    TITLE_CHANGED: ({tabbarName = '', tabName = ''} = {}) => 
        _tabbarEventsTemplate({tabbarName, tabName, actionName: TITLE_CHANGED_NAME}),
    
    // Изменение состояния активности
    ACTIVE_CHANGED: ({tabbarName = '', tabName = ''} = {}) => 
        _tabbarEventsTemplate({tabbarName, tabName, actionName: ACTIVE_CHANGED_NAME}),
    
    // Изменение состояния возможности к использованию
    AVALIABLE_CHANGED: ({tabbarName = '', tabName = ''} = {}) => 
        _tabbarEventsTemplate({tabbarName, tabName, actionName: AVALIABLE_CHANGED_NAME})
};


export default tabbarEvents;