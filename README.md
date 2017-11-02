# RabbitMq-Project-1

To start the message sender, run  


node index  


Then go to localhost:3000 and submit items via the form. The form must be a JSON file containing an array of queues. The queue must have a 'queueName' and an accompanying 'item's' array of the uploaded values. Look at the test.json file for an example.




To start the receiver, run  


node recieve  


and then type in the queue name to recieve all items in the named queue.