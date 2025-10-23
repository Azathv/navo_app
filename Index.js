import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

// 🔹 Shu yerga o'zingning BotFather'dan olgan tokeningni qo'y
const TOKEN = "7992630678:AAHY3kh74kQONW-fMUPjIWShXQcDqe-bFp0";

// 🔹 Bu esa seni Vercel'dagi mini app linki (musiqa player)
const WEB_APP_URL = "https://navo-app-six.vercel.app/"; // o'zingning URL'ing bilan almashtir

// Webhookga keladigan xabarlarni qabul qiladi
app.post("/webhook", async (req, res) => {
  try {
    const message = req.body.message;
    if (!message || !message.chat) return res.send("no message");

    const chatId = message.chat.id;
    const text = message.text;

    if (text === "/start") {
      await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        chat_id: chatId,
        text: "🎶 BORPLAY'ga xush kelibsiz!\nQuyidagi tugma orqali mini appni oching 👇",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🎧 BORPLAY Mini App’ni ochish",
                web_app: { url: WEB_APP_URL },
              },
            ],
          ],
        },
      });
    }

    res.send("ok");
  } catch (err) {
    console.error("Xatolik:", err.message);
    res.send("error");
  }
});

// Test uchun
app.get("/", (req, res) => {
  res.send("Bot ishlayapti ✅");
});

// Vercel portni o'zi beradi
app.listen(3000, () => console.log("Server ishga tushdi"));

