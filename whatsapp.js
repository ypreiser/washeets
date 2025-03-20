// whatsapp.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal'); // For console display (optional)
const QR = require('qrcode');

let client; // Make client accessible
let qrCodeData; // Store the QR code data URL

const initializeWhatsApp = () => {
  client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { 
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Important for some deployments
        headless: true // Run in headless mode (essential for servers)
    }
  });

  client.on('ready', () => {
    console.log('WhatsApp Client is ready!');
  });

  client.on('qr', qr => {
    console.log('QR Code Generated:\n', qr); // Keep console display for debugging
    qrcode.generate(qr, { small: true }); // Console display
     });

  client.on('disconnected', () => {
    console.log('WhatsApp Client disconnected!');
    initializeWhatsApp(); // Reconnect on disconnection
  });


  client.initialize();
};

initializeWhatsApp(); // Initialize the client


client.on('message_create', message => {
    console.log('Received message:', message);
	if (message.body === '!ping') {
		// send back "pong" to the chat the message was sent in
		client.sendMessage(message.from, 'pong');
	}
});
function sendMessage(to, message) {
    client.sendMessage(to, message)
      .then(response => {
        console.log('Message sent successfully:', response);
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  }
  sendMessage('972547982767@c.us', 'test')
module.exports = { client, getQrCode: () => qrCodeData }; // Export client and QR code function