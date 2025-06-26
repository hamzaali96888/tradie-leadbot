const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'tradie_token_123';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Facebook Webhook Verification
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Webhook verified');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else if (req.method === 'POST') {
    // Incoming message (Messenger/WhatsApp)
    console.log('Incoming message:', JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
