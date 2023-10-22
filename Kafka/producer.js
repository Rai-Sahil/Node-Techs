const express = require('express');
const kafka = require('kafka-node');
const Producer = kafka.Producer;
const bodyParser = require('body-parser');
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

const producer = new Producer(client);
const app = express();
const port = 3000;

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/producer.html');
});

// Parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Handle form submission and send message to Kafka
app.post('/send-message', (req, res) => {
    const message = req.body.message;

    // Create a Kafka message
    const payloads = [
        {
            topic: 'my-topic',
            messages: message
        }
    ];

    // Send the message to Kafka
    producer.send(payloads, (err, data) => {
        if (err) {
            console.error('Error producing message:', err);
            res.status(500).send('Error sending message to Kafka');
        } else {
            console.log('Message sent:', data);
            res.send('Message sent to Kafka: ' + message);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
