// models.js
const mongoose = require('./db');

const userSchema = new mongoose.Schema({
  apiKey: { type: String, unique: true, required: true },
  phoneNumber: { type: String, required: true },
  messageCount: { type: Number, default: 0 }
});

const sessionSchema = new mongoose.Schema({
  apiKey: { type: String, unique: true, required: true },
  sessionData: { type: Object, default: {} }
});

const messageSchema = new mongoose.Schema({
  apiKey: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
const Session = mongoose.model("Session", sessionSchema);
const Message = mongoose.model("Message", messageSchema);

module.exports = { User, Session, Message };
