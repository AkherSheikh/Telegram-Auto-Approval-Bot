/**
 * 🤖 Professional Telegram Auto Approval Bot
 * Powered by Cloudflare Workers
 * * Instructions:
 * 1. Set your BOT_TOKEN and BOT_USERNAME below.
 * 2. Deploy to Cloudflare Workers.
 * 3. Set your Webhook.
 */

// --- CONFIGURATION ---
const BOT_TOKEN = 'your_bot_token'; 
const BOT_USERNAME = '@your_bot_username'; 

// ---------------------

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Robots.txt (Prevents Search Engine Indexing)
    if (url.pathname === '/robots.txt') {
      return new Response('User-agent: *\nDisallow: /', { headers: { 'Content-Type': 'text/plain' } });
    }

    // 2. Simple Home Page
    if (request.method === 'GET' && url.pathname === '/') {
      return new Response(generateHomePage(), { headers: { 'Content-Type': 'text/html' } });
    }

    // 3. Telegram Webhook Handler
    if (request.method === 'POST') {
      try {
        const payload = await request.json();

        // Handle /start command
        if (payload.message && payload.message.text === '/start') {
          const chatId = payload.message.chat.id;
          const startText = `👋 **Hello! I'm an Auto Approval Bot.**\n\n` +
                            `To use me in your channel:\n` +
                            `1️⃣ Add me as **Admin**.\n` +
                            `   Username: \`${BOT_USERNAME}\`\n` +
                            `2️⃣ Enable **"Invite Users via Link"**.\n` +
                            `3️⃣ Enable **"Request Admin Approval"** in your invite link.\n\n` +
                            `I will handle the rest!`;

          await sendMessage(chatId, startText);
        }

        // Handle Join Requests
        if (payload.chat_join_request) {
          const { chat, from } = payload.chat_join_request;

          // Approve Request
          await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/approveChatJoinRequest`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chat.id, user_id: from.id }),
          });

          // Private Welcome Message
          const welcomeText = `✨ **Request Approved!**\n\n` +
                              `Hello **${from.first_name}**, you have been accepted to **${chat.title}**. Welcome!\n\n` +
                              `--- \n` +
                              `#`;

          const buttons = {
            inline_keyboard: [[{ text: "🚀 Open Channel", url: `https://t.me/${chat.username || ""}` }]]
          };

          await sendMessage(from.id, welcomeText, buttons);
        }

        return new Response('OK', { status: 200 });
      } catch (error) {
        return new Response('OK', { status: 200 }); // Silent fail for cleaner logs
      }
    }

    return new Response('Method Not Allowed', { status: 405 });
  }
};

// Helper: Send Message
async function sendMessage(chatId, text, replyMarkup = null) {
  const body = {
    chat_id: chatId,
    text: text,
    parse_mode: 'Markdown',
    disable_web_page_preview: true
  };
  if (replyMarkup) body.reply_markup = replyMarkup;

  return fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}

// Helper: Minimal Home Page
function generateHomePage() {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <title>Auto Approval Bot</title>
      <style>
          body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #f0f2f5; }
          .card { text-align: center; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          h1 { color: #0088cc; }
          .btn { text-decoration: none; color: white; background: #0088cc; padding: 10px 20px; border-radius: 5px; }
      </style>
  </head>
  <body>
      <div class="card">
          <h1>Bot is Online</h1>
          <p>Telegram Auto Approval Worker is running successfully.</p>
          <br>
          <a href="https://your-website.com" class="btn">developer</a>
      </div>
  </body>
  </html>`;
}
