import utiles from './utiles.js';

class HttpRequester {

    _doRequest({
        method = 'GET',
        url = '/',
        callback = utiles.noop,
        data = {}
    } = {}) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) {
                return;
            }

            if (xhr.status < 300) {
                const responseText = xhr.responseText;
                try {
                    const response = JSON.parse(responseText);
                    callback(null, response);
                } catch (err) {
                    callback(err);
                }
            } else {
                callback(xhr);
            }
        };

        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.withCredentials = true;

        xhr.send(JSON.stringify(data));      
    }

    doGet({url = '/', callback = utiles.noop, data = {}} = {}) {
        this._doRequest({
            method: 'GET', url, callback, data 
        });
    }

    doPost({url = '/', callback = utiles.noop, data = {}} = {}) {
        this._doRequest({
            method: 'POST', url, callback, data 
        });
    }
}

const httpRequester = new HttpRequester();

export default httpRequester;