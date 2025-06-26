const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'tradie_token_123';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('✅ Webhook verified!');
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }

  if (req.method === 'POST') {
    console.log('📩 Incoming message:', JSON.stringify(req.body, null, 2));
    return res.sendStatus(200);
  }

  res.status(405).send('Method Not Allowed');
}

