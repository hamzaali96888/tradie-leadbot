const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'tradie_token_123';

app.use(bodyParser.json());

// Facebook Webhook Verification
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Message Receiver (optional WhatsApp/email logic here)
app.post('/webhook', (req, res) => {
  console.log('Incoming message:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Messenger bot running on port 3000');
});