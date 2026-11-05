// Ato TARAFINDAN yapılmıştır
// Komutları commands/ klasöründen otomatik yükler ve gelen mesajları ilgili komuta yönlendirir.
// Yeni bir komut eklemek için commands/ içine yeni bir .js dosyası atman yeterli — bu dosyayı
// değiştirmene gerek yok. Bir komut dosyasının şekli:
//
//   export default [
//     { name: 'selam', aliases: ['hi'], async run(ctx) { await ctx.reply('Selam!'); } },
//   ];
//
// ctx içinde şunlar var:
//   ctx.g        -> sunucu (guild) ID'si
//   ctx.c        -> kanal ID'si
//   ctx.author   -> komutu yazan kullanıcı ({ id, username, ... })
//   ctx.args     -> komuttan sonraki kelimeler, dizi olarak (örn. "ap selam Ali" -> ['Ali'])
//   ctx.content  -> mesajın tam metni
//   ctx.reply(p) -> komutu yazan mesaja YANIT olarak gönderir (p: metin ya da { embeds, ... })
//   ctx.send(p)  -> aynı kanala normal mesaj gönderir (yanıt olmadan)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { PREFIX } from './config.js';
import { norm } from './util.js';
import * as R from './rest.js';

const here = path.dirname(fileURLToPath(import.meta.url));
export const commands = new Map();

export async function loadCommands() {
  const dir = path.join(here, '..', 'commands');
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js'))) {
    const m = await import(pathToFileURL(path.join(dir, f)).href);
    for (const c of Array.isArray(m.default) ? m.default : [m.default]) {
      if (!c?.name) continue;
      commands.set(norm(c.name), c);
      for (const a of c.aliases || []) commands.set(norm(a), c);
    }
  }
  return commands;
}

export async function handleMessage(msg) {
  const author = msg.author ?? msg.member?.user;
  const g = msg.guild_id ?? msg.guildId ?? msg.guild?.id;
  const c = msg.channel_id ?? msg.channelId ?? msg.channel?.id;
  if (!author || author.bot) return;
  if (!g || !c) return; // DM gibi sunucu dışı mesajları yok sayıyoruz

  const content = String(msg.content ?? '');
  if (!content.toLowerCase().startsWith(PREFIX)) return;

  const ctx = {
    g, c, author, content, args: [],
    reply: (p) => {
      const body = typeof p === 'string' ? { content: p } : { ...p };
      return R.send(g, c, { ...body, message_reference: { message_id: msg.id } }).catch((e) => {
        if (e.status === 400 || e.status === 404) return R.send(g, c, body);
        throw e;
      });
    },
    send: (p) => R.send(g, c, p),
  };

  const parts = content.slice(PREFIX.length).trim().split(/\s+/).filter(Boolean);
  const name = norm(parts.shift() || '');
  const cmd = commands.get(name);
  if (!cmd) return;
  ctx.args = parts;

  try {
    await cmd.run(ctx);
  } catch (e) {
    console.error(`❌ [${name}]`, e.message);
    await R.send(g, c, `❌ Hata: \`${String(e.message).slice(0, 180)}\``).catch(() => {});
  }
}

export function attachEvents(client) {
  const safe = (name, fn) => client.on(name, (...a) => Promise.resolve(fn(...a)).catch((e) => console.error(`[${name}]`, e.message)));
  safe('messageCreate', handleMessage);
  client.on('ready', () => {
    console.log(`✅ Bot hazır: ${client.user?.username ?? ''}`);
  });
}
