// Ato TARAFINDAN yapılmıştır
import 'dotenv/config';
import { Client, GatewayIntentBits } from '@jubbio/core';
import { loadCommands, attachEvents } from './lib/bot.js';

if (!process.env.BOT_TOKEN) {
  console.error('❌ BOT_TOKEN yok! .env dosyasına BOT_TOKEN=... yaz (host kullanıyorsan "Ortam Değişkenleri" bölümüne ekle).');
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const cmds = await loadCommands();
console.log(`📦 ${new Set(cmds.values()).size} komut yüklendi`);
attachEvents(client);

process.on('unhandledRejection', (e) => console.error('Yakalanmayan hata:', e?.message ?? e));
client.login(process.env.BOT_TOKEN);
