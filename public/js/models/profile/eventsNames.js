'use strict';

const USER = 'user';
const DATA_CHANGED = 'dataChaged';

const profileEvents = {
    // Авторизация
    AUTHORIZED: () => `/${USER}/auth`,

    // Выход
    DEAUTHORIZED: () => `/${USER}/deauth`,
    
    // Изменение данных
    DATA_CHANGED: () => `/${USER}/${DATA_CHANGED}`
};

export default profileEvents;