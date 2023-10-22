const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

const topics = [{ topic: 'my-topic', partition: 0 }];

const options = {
    autoCommit: true,
    groupId: 'my-consumer-group'
};

const consumer = new Consumer(client, topics, options);

consumer.on('message', (message) => {
    console.log('Received message:', message);
});

consumer.on('error', (err) => {
    console.error('Consumer error:', err);
});
