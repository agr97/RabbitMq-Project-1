const express = require('express');
const multer = require('multer');
const amqp = require('amqplib/callback_api');

const upload = multer({ storage: multer.memoryStorage() });
const app = express();

app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/` + 'index.html');
});

amqp.connect('amqp://cdllbwik:zTqDj6ZKHD4EM4IYRCNmcGDEDb3Lrjgt@mosquito.rmq.cloudamqp.com/cdllbwik', (err, conn) => {
  conn.createChannel((err, ch) => {
    console.log('Connected to cloudAMPQ');

    app.post('/file', upload.single('queueFile'), function (req, res) {
      const jsonArray = JSON.parse(req.file.buffer);

      jsonArray.forEach(function (queue) {
        ch.assertQueue(queue.queueName, { durable: false });

        queue.items.forEach((element) => {
          ch.sendToQueue(queue.queueName, new Buffer(element.toString()));
        }, this);

        console.log('Sent to %s', queue.queueName);
      }, this);
    });

    app.post('/', upload.none(), (req, res) => {
      ch.assertQueue(req.body.queueName, { durable: false });
      ch.sendToQueue(req.body.queueName, new Buffer(req.body.itemName));
      console.log('Sent Message');
    });
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
