const prompt = require('prompt');
const amqp = require('amqplib/callback_api');

prompt.start();
prompt.get('queueName', function(err, result) {
  const queue = result.queueName;

  amqp.connect('amqp://cdllbwik:zTqDj6ZKHD4EM4IYRCNmcGDEDb3Lrjgt@mosquito.rmq.cloudamqp.com/cdllbwik', function(err, conn) {
    conn.createChannel(function(err, ch) {
      ch.assertQueue(queue, {durable: false});
      
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
      ch.consume(queue, function(msg) {
        console.log(" [x] Received " + msg.content.toString());
      }, {noAck: true});
    });
  });
});

