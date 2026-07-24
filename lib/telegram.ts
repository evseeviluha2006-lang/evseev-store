// lib/telegram.ts

const BOT_TOKEN = "7765297336:AAFP8gz83t1WPcbQ9U6Fc8dl_JYqmgbLEds";
const CHAT_ID = "7465159990";

export async function sendToTelegram(text: string) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'HTML',
      }),
    });
    return true;
  } catch (error) {
    console.error("Ошибка отправки в Telegram:", error);
    return false;
  }
}