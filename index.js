const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://cdllbwik:zTqDj6ZKHD4EM4IYRCNmcGDEDb3Lrjgt@mosquito.rmq.cloudamqp.com/cdllbwik', (err, conn) => {
  conn.createChannel((err, ch) => {
    const q = 'queue2';
    ch.assertQueue(q, { durable: false });

    app.post('/', (req, res) => {
      ch.sendToQueue(q, new Buffer(req.body.text));
      console.log('Sent Message');
    });
  });
});

app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/` + 'index.html');
});

var listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
