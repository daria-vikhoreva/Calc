'use strict';

const inputRub = document.querySelector('#rub'),
    inputUsd = document.querySelector('#usd');

inputRub.addEventListener('input', () => {
    const request = new XMLHttpRequest();

    request.open('GET', 'js/current.json');
    // request.open(method, url, async, login, password);
    // open() собирает настройки, которые в будущем помогут сделать запрос
    // method - метод, который используется для запроса: GET, POST
    // url - путь к серверу
    // async - асинхронность, по умолчанию true
    // login, password - для некоторых запросов нужны логин и пароль


    // http-заголовок для передачи json-файлов
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    // send() - отправление запроса, при GET-запросе мы запрашиваем информацию, ничего не отправляя на сервер, поэтому оставляем send() без аргумента, при POST-запросе метод send() принимает аргумент body - данные, которые отправляем на сервер
    request.send();

    // вариант 1
    // request.addEventListener('readystatechange', () => {
    //    if (request.readyState === 4 && request.status === 200) {
    //         console.log(request.response);
    //         const data = JSON.parse(request.response);
    //         inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2);
    //    } else {
    //         inputUsd.value = "Что-то пошло не так";
    //    }
    // });

    // вариант 2
    request.addEventListener('load', () => {
        if (request.status === 200) {
            console.log(request.response);
            const data = JSON.parse(request.response);
            inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2);
       } else {
            inputUsd.value = "Что-то пошло не так";
       }
    });

    // важные свойства request
    // status - свойство, которое содержит статус запроса (напр. 404, 200, 0, 403): https://siterost.net/post/http-status-codes
    // statusText - свойство, которое содержит текстовое описание ответа от сервера (напр. Not Found, OK)
    // response - ответ от сервера, заданный бэкендом; есть аналог responseText
    // readyState - содержит текущее состояние запроса (0-4): https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState


})