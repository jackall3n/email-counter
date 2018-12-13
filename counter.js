const GIFEncoder = require('gifencoder');
const {createCanvas, registerFont} = require('canvas');
const fs = require('fs');
const moment = require('moment');
const pngFileStream = require('png-file-stream');

registerFont('NotoSans-Bold.ttf', { family: 'NotoSansBold'});
registerFont('NotoSans-Regular.ttf', { family: 'NotoSansExtraLight'});

const COLORS = {
    blue: '#006193',
    white: '#FFFFFF'
};

const width = 500;
const height = 150;

const width_of_each = width / 4;


module.exports = function Counter(date, callback) {

    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    const encoder = new GIFEncoder(width, height);

    const stream = encoder.createReadStream().pipe(fs.createWriteStream('countdown.gif'));

    stream.on('finish', () => {
        callback();
    })

    encoder.start();
    encoder.setRepeat(-1);
    encoder.setDelay(1000);
    encoder.setQuality(10);

    const start = moment();
    const end = moment(date);
    const remaining = end.diff(start);
    const duration = moment.duration(remaining);

    context.textAlign = "center";
    context.textBaseline = 'middle';

    function drawFrame(time) {
        // Background style
        context.fillStyle = COLORS.blue;
        context.fillRect(0, 0, width, height);

        // Font style
        context.fillStyle = COLORS.white;

        context.fillRect(width_of_each, 40, 1, 50);

        drawUnit(0, time.days(), 'Days');
        drawUnit(1, time.hours(), 'Hours');
        drawUnit(2, time.minutes(), 'Minutes');
        drawUnit(3, time.seconds(), 'Sec\'s');

        encoder.addFrame(context);
    }

    function drawUnit(i, unit, label) {
        const text_x = (width_of_each * i) + (width_of_each / 2);
        context.font = "70px NotoSansBold";
        context.fillText(unit, text_x, 60);

        context.font = "20px NotoSansExtraLight";
        context.fillText(label, text_x, 115)
    }

    for (let i = 0; i <= 20; i++) {
        const frame_time = duration.clone();
        frame_time.add(-i, 'seconds');

        drawFrame(frame_time)
    }

    encoder.finish();
};






