const GIFEncoder = require('gifencoder');
const { createCanvas } = require('canvas');
const fs = require('fs');

const width = 200;
const height = 200;

const canvas = createCanvas(width, height);
const context = canvas.getContext('2d');

const encoder = new GIFEncoder(width, height);

encoder.createReadStream().pipe(fs.createWriteStream('countdown.gif'));

encoder.start();
encoder.setRepeat(0);
encoder.setDelay(1000);
encoder.setQuality(10);

context.fillStyle = '#ff0000';
context.fillRect(0, 0, width, height);
encoder.addFrame(context);

context.fillStyle = '#00ff00';
context.fillRect(0, 0, width, height);
encoder.addFrame(context);

context.fillStyle = '#0000ff';
context.fillRect(0, 0, width, height);
encoder.addFrame(context);

encoder.finish();







