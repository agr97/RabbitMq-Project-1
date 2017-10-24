var express = require('express');
var app     = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var amqp = require('amqplib/callback_api');
amqp.connect('amqp://cdllbwik:zTqDj6ZKHD4EM4IYRCNmcGDEDb3Lrjgt@mosquito.rmq.cloudamqp.com/cdllbwik', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'queue2'    
    ch.assertQueue(q, {durable: false});     
    
    app.post('/', function (req, res) {
          ch.sendToQueue(q, new Buffer(req.body.text));
          console.log("Sent Message");
    });        
  });
});

app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/index.html`);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
