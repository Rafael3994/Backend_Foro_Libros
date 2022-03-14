var express = require('express');
var router = express.Router();
const i18next = require('i18next');

const changeLanguage = (lenguage) => {
    i18next.changeLanguage(lenguage, (err, t) => {
        if (err) return console.log('something went wrong loading', err);
    });
}

router.get('/es', (req, res, next) => {
    changeLanguage('es');
    const response = i18next.t('lengChange')
    res.json(`${response}`);
});

router.get('/en', (req, res, next) => {
    changeLanguage('en');
    const response = i18next.t('lengChange')
    res.json(`${response}`);
});

router.get('/cat', (req, res, next) => {
    changeLanguage('cat');
    const response = i18next.t('lengChange')
    res.json(`${response}`);
});

module.exports = router;