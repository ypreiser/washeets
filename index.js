// index.js
const express = require("express");
const { client, getQrCode } = require("./whatsapp.js"); // Import client and QR function
const bodyParser = require("body-parser"); // For parsing request bodies
const QRCode = require("qrcode");

const app = express();
const port = process.env.PORT || 3333; // Use environment port or 3333
app.use(bodyParser.json()); // To parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // to parse url encoded data

const clients = {}; // Store clients with API keys
const messageQueue = [];

// API Key Management (Simple Example - Replace with a database for production)
const apiKeys = {
  YOUR_API_KEY: "123", // Replace with your actual API keys
};

const verifyApiKey = (apiKey) => {
  return apiKeys[apiKey] == true;
};

app.get("/qr", (req, res) => {
  client.on("qr", (qr) => {
        QRCode.toDataURL(qr, (err, url) => {
        if (err) return res.status(500).send("Error generating QR code");
        res.send(`<img src="${url}">`);
    });
  });
});

app.get  ("/send", async (req, res) => {
  const { key, number, msg } = req.query; // Use body for POST requests

  //   if (!verifyApiKey(key)) {
  //     return res.status(403).send({ error: "Invalid API Key" });
  //   }

  if (!number || !msg) {
    return res.status(400).send({ error: "Missing phone number or message" });
  }
  try {
    client.sendMessage(`${number}@c.us`, msg)
      .then(response => {
        console.log('Message sent successfully:', response);
        res.status(200).send({ status: "Message sent" });
      })
      .catch(error => {
        console.error('Error sending message:', error);
        res.status(500).send({ error: "Failed to send message" });
      });
  } catch (error) {
    res.status(500).send({ error: "Failed to send message", details: error });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
