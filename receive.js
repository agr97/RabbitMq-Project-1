const amqp = require('amqplib/callback_api');

amqp.connect('amqp://cdllbwik:zTqDj6ZKHD4EM4IYRCNmcGDEDb3Lrjgt@mosquito.rmq.cloudamqp.com/cdllbwik', function(err, conn) {
    conn.createChannel(function(err, ch) {
      var q = 'queue2';
      ch.assertQueue(q, {durable: false});
      
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
      ch.consume(q, function(msg) {
        console.log(" [x] Received %s", msg.content.toString());
      }, {noAck: true});
      
    });
  });