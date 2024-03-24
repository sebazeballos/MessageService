const express = require('express');
const bodyParser = require('body-parser');
const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express();
const port = 80;

const client = new Client();
let ready = false;

client.on('qr', qr => {
  qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
  console.log('Client is ready!');
  ready = true;
});

client.initialize();

app.use(bodyParser.json());

app.post('/send-message', async (req, res) => {
  if (!ready) {
    return res.status(503).send({ message: 'WhatsApp client not ready' });
  }

  const { user_number, worker_number, worker_message, user_message } = req.body;

  try {
    if (user_message) {
      await client.sendMessage(user_number + '@c.us', user_message);
    }

    if (worker_message) {
      await client.sendMessage(worker_number + '@c.us', worker_message);
    }

    res.send({ message: 'Messages sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to send message' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
