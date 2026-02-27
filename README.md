# 🤖 Telegram Auto Approval Bot

A professional, high-performance Telegram Bot built with **Cloudflare Workers** (Serverless) to automatically approve channel join requests instantly.

## 🚀 How to Make This Bot?

Follow these simple steps to host your own bot for free:

### 1️⃣ Bot Setup
- Create a bot via [@BotFather](https://t.me/BotFather) and get your **API Token**.
- Add the bot to your Telegram Channel as an **Admin**.
- Ensure the admin permission **"Invite Users via Link"** is enabled.
- Set your Channel's invite link to **"Request Admin Approval"**.

### 2️⃣ Cloudflare Worker Deployment
- Sign up/Login to [Cloudflare](https://dash.cloudflare.com/).
- Create a new **Worker**.
- Copy the code from `index.js` in this repository.
- Replace `BOT_TOKEN` and `BOT_USERNAME` with your credentials.
- Click **Save and Deploy**.

### 3️⃣ Set Webhook (Crucial Step)
To connect Telegram with your Cloudflare Worker, open your browser and visit this URL:
`https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=<YOUR_WORKER_URL>&allowed_updates=["message","chat_join_request"]`

*(Replace `<YOUR_BOT_TOKEN>` and `<YOUR_WORKER_URL>` with your actual data)*

## 🛠 Features
- ⚡ **Instant Approval:** No delay in accepting members.
- 💸 **100% Free:** Uses Cloudflare Workers free tier.
- 🔒 **Privacy:** Includes `robots.txt` to prevent search engine indexing.
- 🎨 **Minimal Home Page:** Professional landing page included.

## 👨‍💻 Developer
Developed by [AkherSheikh](https://github.com/AkherSheikh).
