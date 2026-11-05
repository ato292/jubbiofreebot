// Ato TARAFINDAN yapılmıştır
// Jubbio REST API ile konuşan en alt katman. Komutların içinden genelde doğrudan bunu
// çağırmazsın — ctx.reply(...) / ctx.send(...) zaten bunu senin yerine kullanıyor.
import { BASE } from './config.js';
import { sleep } from './util.js';

export async function api(method, path, body, tries = 0) {
  const res = await fetch(BASE + path, {
    method,
    headers: { Authorization: `Bot ${process.env.BOT_TOKEN}`, ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}) },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data = text;
  try { data = text ? JSON.parse(text) : null; } catch {}
  if (res.status === 429 && tries < 3) {
    await sleep(Math.min(5000, (data?.retry_after ?? 1) * 1000));
    return api(method, path, body, tries + 1);
  }
  if (!res.ok) {
    const e = new Error(`${method} ${path} -> ${res.status} ${String(text).slice(0, 200)}`);
    e.status = res.status;
    throw e;
  }
  return data;
}

const B = '/bot/guilds';

export async function send(g, c, payload) {
  if (typeof payload === 'string') payload = { content: payload };
  try {
    return await api('POST', `${B}/${g}/channels/${c}/messages`, payload);
  } catch (e) {
    // Buton/embed Jubbio tarafından kabul edilmediyse, düz metin olarak tekrar dene
    if (e.status === 400 && payload.components) {
      const { components, ...rest } = payload;
      return await api('POST', `${B}/${g}/channels/${c}/messages`, rest);
    }
    throw e;
  }
}
