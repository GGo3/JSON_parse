const { promiseImpl } = require('ejs');
var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer();
const fs = require('fs').promises;
const path = require('path');

// рендер стартовой страници

router.get('/', (req, res, next) => {
    res.render('index')
});

// ф-я создания первого файла и записи JSON

const createJSON = async (dataObj, failName) => {
    let tempObj = [];
    tempObj.push(dataObj);
    await fs.writeFile(failName, JSON.stringify(tempObj));
};

// ф-я создания первого файла и записи JSON

const writeNewJSON = async (dataObj, newData, failName) => {
    let tempJSON = JSON.parse(dataObj);
    tempJSON.push(newData);
    await fs.writeFile(failName, JSON.stringify(tempJSON));
};

// ф-я которая получаеет доступ к объекту JSON файла и внутри вызывается ф-я перезаписи файла

const appendToJSON = async (newData, failName) => {
    await fs.readFile(failName)
    .then((data) => {
        writeNewJSON(data, newData, failName);
    })
    .catch((e) => {console.log(e)})
};

// роутинг приема пост запроса с фронта, внутри проверяеться наличие файла, если его не будет то сработает функция создания нового, а если есть то берёться старый и записывается во внутрь еще одна дата

router.post('/api', upload.none(), (req, res) => {
    fs.access('main.json', fs.F_OK)
    .then(() => {
        appendToJSON(req.body,'main.json')
        .then(() => {res.send('сохранено успешно')})
        .catch((e) => {res.send(e)})
    })
    .catch(() => {
        createJSON(req.body, 'main.json')
        .then(() => {res.send('сохранено успешно')})
        .catch((e) => {res.send(e)})
    });
});

// get запрос отправляет  JSON файл в браузер по адресу /api

router.get('/api', (req, res) => {
    let apiFail = path.join(__dirname, '../main.json');
    res.sendFile(apiFail);
});

module.exports = router;
