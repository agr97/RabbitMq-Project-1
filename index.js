const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

const app = express();
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
const amqp = require('amqplib/callback_api');

app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/` + 'index.html');
});

amqp.connect('amqp://cdllbwik:zTqDj6ZKHD4EM4IYRCNmcGDEDb3Lrjgt@mosquito.rmq.cloudamqp.com/cdllbwik', (err, conn) => {
  conn.createChannel((err, ch) => {
    console.log('Connected to cloudAMPQ');

    app.post('/upload', function (req, res) {
      const jsonArray = JSON.parse(req.files.form.data);

      jsonArray.forEach(function (queue) {
        ch.assertQueue(queue.queueName, { durable: false });

        queue.items.forEach((element) => {
          ch.sendToQueue(queue.queueName, new Buffer(element.toString()));
        }, this);

        console.log('Sent to %s', queue.queueName);
      }, this);
    });

    const q = 'queue2';

    app.post('/', (req, res) => {
      ch.sendToQueue(q, new Buffer(req.body.text));
      console.log('Sent Message');
    });
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
