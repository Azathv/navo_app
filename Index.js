import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const TOKEN = "BOT_TOKEN_BU_YERGA_QO'YILADI";
const WEB_APP_URL = "https://borplay.vercel.app"; // sizning Vercel linkingiz

app.post(`/webhook`, async (req, res) => {
  const chatId = req.body.message.chat.id;
  const text = req.body.message.text;

  if (text === "/start") {
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: chatId,
      text: "🎶 BORPLAY'ga xush kelibsiz! Quyidagi tugmani bosing:",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🎧 BORPLAY Mini App’ni ochish", web_app: { url: WEB_APP_URL } }]
        ]
      }
    });
  }

  res.send("ok");
});

app.get("/", (req, res) => {
  res.send("Bot ishlayapti ✅");
});

app.listen(3000, () => console.log("Server ishga tushdi"));
