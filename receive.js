const prompt = require('prompt');
const amqp = require('amqplib/callback_api');

prompt.start();
prompt.get('queueName', (err, result) => {
  const queue = result.queueName;

  amqp.connect('amqp://cdllbwik:zTqDj6ZKHD4EM4IYRCNmcGDEDb3Lrjgt@mosquito.rmq.cloudamqp.com/cdllbwik', (err, conn) => {
    conn.createChannel((err, ch) => {
      ch.assertQueue(queue, { durable: false });

      console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);
      ch.consume(queue, (msg) => {
        console.log(` [x] Received ${msg.content.toString()}`);
      }, { noAck: true });
    });
  });
});
