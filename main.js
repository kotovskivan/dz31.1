console.log('ДЗ 31.1');

var BASE_URL = 'https://jsonplaceholder.typicode.com';

(function ensureFetch() {
  if (typeof fetch === 'undefined' && typeof require === 'function') {
    try {
      var nf = require('node-fetch');
      if (typeof global !== 'undefined') {
        global.fetch = nf;
      } else if (typeof window !== 'undefined') {
        window.fetch = nf;
      }
    } catch (e) {
    }
  }
})();

function buildURL(segment) {
  if (typeof segment !== 'string') segment = String(segment || '');
  if (segment.charAt(0) !== '/') segment = '/' + segment;
  return BASE_URL + segment;
}

/*
 * #1 — GET
 */
function getData(segment) {
  try {
    var url = buildURL(segment);
    return fetch(url)
      .then(function (response) {
        if (response.ok) {
          return response.json().then(function (data) {
            console.log('Успішний GET-запит:', data);
            return data;
          });
        }
        console.error('Помилка GET. Статус:', response.status);
        return response.status;
      })
      .catch(function (error) {
        var msg = 'Виняток під час GET: ' + (error && error.message ? error.message : String(error));
        console.error(msg);
        return msg;
      });
  } catch (error) {
    var msg = 'Виняток під час GET: ' + (error && error.message ? error.message : String(error));
    console.error(msg);
    return Promise.resolve(msg);
  }
}

/*
 * #2 — POST
 */
function postData(segment, data) {
  try {
    var url = buildURL(segment);
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        if (response.ok) {
          return response.json().then(function (result) {
            console.log('Успішний POST-запит:', result);
            return result;
          });
        }
        var msg = 'POST завершився помилкою. Статус: ' + response.status;
        console.error(msg);
        return msg;
      })
      .catch(function (error) {
        var msg = 'Виняток під час POST: ' + (error && error.message ? error.message : String(error));
        console.error(msg);
        return msg;
      });
  } catch (error) {
    var msg = 'Виняток під час POST: ' + (error && error.message ? error.message : String(error));
    console.error(msg);
    return Promise.resolve(msg);
  }
}

/*
 * #3 — PUT
 */
function putData(id, data) {
  try {
    var url = buildURL('/posts/' + id);
    return fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        if (response.ok) {
          return response.json().then(function (result) {
            console.log('Успішний PUT-запит:', result);
            return result;
          });
        }
        var msg = 'PUT завершився помилкою. Статус: ' + response.status;
        console.error(msg);
        return msg;
      })
      .catch(function (error) {
        var msg = 'Виняток під час PUT: ' + (error && error.message ? error.message : String(error));
        console.error(msg);
        return msg;
      });
  } catch (error) {
    var msg = 'Виняток під час PUT: ' + (error && error.message ? error.message : String(error));
    console.error(msg);
    return Promise.resolve(msg);
  }
}

/*
 * #4 — PATCH
 */
function patchData(id, data) {
  try {
    var url = buildURL('/posts/' + id);
    return fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        if (response.ok) {
          return response.json().then(function (result) {
            console.log('Успішний PATCH-запит:', result);
            return result;
          });
        }
        var msg = 'PATCH завершився помилкою. Статус: ' + response.status;
        console.error(msg);
        return msg;
      })
      .catch(function (error) {
        var msg = 'Виняток під час PATCH: ' + (error && error.message ? error.message : String(error));
        console.error(msg);
        return msg;
      });
  } catch (error) {
    var msg = 'Виняток під час PATCH: ' + (error && error.message ? error.message : String(error));
    console.error(msg);
    return Promise.resolve(msg);
  }
}

/*
 * #5 — DELETE
 */
function deleteData(id) {
  try {
    var url = buildURL('/posts/' + id);
    return fetch(url, { method: 'DELETE' })
      .then(function (response) {
        if (response.ok) {
          var okMsg = 'Пост із id ' + id + ' успішно видалено.';
          console.log(okMsg);
          return true;
        }
        var failMsg = 'Не вдалося видалити пост із id ' + id + '. Статус: ' + response.status;
        console.error(failMsg);
        return response.status;
      })
      .catch(function (error) {
        var errMsg = 'Помилка під час видалення: ' + (error && error.message ? error.message : String(error));
        console.error(errMsg);
        return errMsg;
      });
  } catch (error) {
    var errMsg = 'Помилка під час видалення: ' + (error && error.message ? error.message : String(error));
    console.error(errMsg);
    return Promise.resolve(errMsg);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getData: getData,
    postData: postData,
    putData: putData,
    patchData: patchData,
    deleteData: deleteData
  };
}
if (typeof window !== 'undefined') {
  window.getData = getData;
  window.postData = postData;
  window.putData = putData;
  window.patchData = patchData;
  window.deleteData = deleteData;
}
