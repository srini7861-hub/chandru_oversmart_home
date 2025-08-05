// server.js
const express = require("express");
const axios = require("axios");
const app = express();

const botToken = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

app.get("/send", async (req, res) => {
  const msg = req.query.msg || "No message provided";

  try {
    await axios.get(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      params: {
        chat_id: chatId,
        text: msg,
      },
    });

    res.send("Message sent!");
  } catch (err) {
    console.error("Telegram send failed:", err.message);
    res.status(500).send("Error sending message");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
