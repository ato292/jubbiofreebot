// Ato TARAFINDAN yapılmıştır
// Yardımcı fonksiyonlar. Yeni komut yazarken bunları kullanabilirsin.

// Türkçe karakterlere duyarlı, büyük/küçük harf farkı gözetmeyen karşılaştırma anahtarı.
// Komut adları ve takma adlar (aliases) bu fonksiyonla karşılaştırılıyor.
export function norm(s = '') {
  return String(s)
    .replace(/İ/g, 'i').replace(/I/g, 'i').replace(/ı/g, 'i')
    .toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ç/g, 'c');
}

// "<@123>" / "<@!123>" / "123" yazımlarının hepsinden kullanıcı ID'sini çıkarır.
export const userId = (s = '') => (String(s).match(/^<@!?(\d{5,})>$/) || String(s).match(/^(\d{5,})$/) || [])[1] || null;
// "<@&123>" / "123" -> rol ID'si.
export const roleId = (s = '') => (String(s).match(/^<@&(\d{5,})>$/) || String(s).match(/^(\d{5,})$/) || [])[1] || null;
// "<#123>" / "123" -> kanal ID'si.
export const chanId = (s = '') => (String(s).match(/^<#(\d{5,})>$/) || String(s).match(/^(\d{5,})$/) || [])[1] || null;

// Basit embed oluşturucu. Kullanım: embed({ title, description, fields, color })
export function embed({ title, description, color = 0x5865f2, fields, footer, thumbnail, image, author } = {}) {
  const e = { color };
  if (title) e.title = title;
  if (description) e.description = description;
  if (fields) e.fields = fields;
  if (footer) e.footer = footer;
  if (thumbnail) e.thumbnail = { url: thumbnail };
  if (image) e.image = { url: image };
  if (author) e.author = author;
  return e;
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
