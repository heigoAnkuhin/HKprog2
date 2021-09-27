"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
var port = 3000;
var responseCodes = {
    ok: 200,
    created: 201,
    noContent: 204,
    badRequest: 400,
    notFound: 404
};
var db = {
    oppejoud: [
        {
            id: 1,
            eesNimi: 'Juku',
            pereNimi: 'Juurikas'
        },
        {
            id: 2,
            eesNimi: 'Mari',
            pereNimi: 'Maasikas'
        }
    ],
    oppeaine: [
        {
            id: 1,
            aineNimi: 'Riistvara'
        },
        {
            id: 2,
            aineNimi: 'Programmeerimine'
        }
    ],
    koht: [
        {
            id: 1,
            kohaNimi: 'Klass 1'
        },
        {
            id: 2,
            kohaNimi: 'Klass 2'
        }
    ],
    nadalaPaev: [
        {
            id: 1,
            paevaNimi: 'Esmaspäev'
        },
        {
            id: 2,
            paevaNimi: 'Kolmpäev'
        }
    ]
};
app.get('/oppejoud', function (req, res) {
    res.status(responseCodes.ok).json({
        oppejoud: db.oppejoud
    });
});
app.post('/oppejoud', function (req, res) {
    var _a = req.body, eesNimi = _a.eesNimi, pereNimi = _a.pereNimi;
    var id = db.oppejoud.length + 1;
    if (!eesNimi) {
        return res.status(400).json({
            error: 'Palun täpsusta eesnimi.'
        });
    }
    if (!pereNimi) {
        return res.status(400).json({
            error: 'Palun täpsusta perenimi.'
        });
    }
    db.oppejoud.push({
        id: id,
        eesNimi: eesNimi,
        pereNimi: pereNimi
    });
    return res.status(responseCodes.created).json({
        id: id
    });
});
app.patch('/oppejoud/:id', function (req, res) {
    var id = parseInt(req.params.id, 10);
    var _a = req.body, eesNimi = _a.eesNimi, pereNimi = _a.pereNimi;
    if (!id) {
        return res.status(400).json({
            error: 'Kasutaja täpsustamiseks on vajalik ID.'
        });
    }
    if (!eesNimi && !pereNimi) {
        return res.status(400).json({
            error: 'Uuendamiseks vajalikud parameetrid puuduvad.'
        });
    }
});
app["delete"]('/oppejoud/:id', function (req, res) {
    var id = parseInt(req.params.id, 10);
    var index = db.oppejoud.findIndex(function (element) { return element.id === id; });
    if (!id) {
        return res.status(400).json({
            error: 'Kasutaja täpsustamiseks on vajalik ID.'
        });
    }
    if (index < 0) {
        return res.status(responseCodes.badRequest).json({
            message: "Kasutajat, kelle id on " + id + " ei eksisteeri."
        });
    }
    db.oppejoud.splice(index, 1);
    return res.status(responseCodes.noContent).send();
});
app.listen(port, function () {
    console.log('Server is running');
});
