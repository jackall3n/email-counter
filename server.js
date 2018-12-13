const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const counter = require('./counter');


app.get('/test', (req, res) => {
    res.send('ello')
});

app.get('/:date', (req, res) => {

    counter(req.params.date, () => {
        const gif = fs.readFileSync('countdown.gif');

        res.set({
            'Content-Type': 'image/gif'
        });

        res.send(gif)
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));