# Atom Jubbio Template

**Ato TARAFINDAN yapılmıştır**

Sade, herkesin kolayca komut ekleyebileceği bir Jubbio botu iskeleti. Şu an tek bir örnek komutu var: `ap ping`.

## Kurulum

1. `npm install`
2. `.env.example` dosyasını `.env` olarak kopyala, içine kendi bot tokenini yaz:
   ```
   BOT_TOKEN=senin_tokenin
   ```
3. Başlat:
   ```
   npm start
   ```
   ya da
   ```
   node index.js
   ```
4. "Bot hazır" yazısını görünce sunucuda `ap ping` yaz, botun cevap verdiğini göreceksin.

## Yeni komut nasıl eklenir?

`commands/` klasörüne yeni bir `.js` dosyası at — bot açılırken o klasördeki **her** dosyayı otomatik yükler, başka hiçbir yeri değiştirmene gerek yok.

Dosyanın şekli hep aynı:

```js
export default [
  {
    name: 'selam',
    aliases: ['hi', 'merhaba'],
    async run(ctx) {
      await ctx.reply(`Selam <@${ctx.author.id}>!`);
    },
  },
];
```

Bir dosyada birden fazla komut da olabilir — `export default [...]` dizisine istediğin kadar obje ekleyebilirsin.

`ctx` (komutun içinde kullanabileceğin bilgiler):

| Alan | Ne işe yarar |
|---|---|
| `ctx.g` | Komutun yazıldığı sunucunun ID'si |
| `ctx.c` | Komutun yazıldığı kanalın ID'si |
| `ctx.author` | Komutu yazan kullanıcı (`ctx.author.id`, `ctx.author.username`) |
| `ctx.args` | Komuttan sonraki kelimeler, dizi olarak (`ap selam Ali` → `['Ali']`) |
| `ctx.content` | Mesajın tam metni |
| `ctx.reply(p)` | Komutu yazan mesaja **yanıt olarak** gönderir — `p` düz metin ya da `{ embeds: [...] }` gibi bir obje olabilir |
| `ctx.send(p)` | Aynı kanala normal (yanıtsız) mesaj gönderir |

`lib/util.js` içinde `userId()`, `roleId()`, `chanId()` (mention/ID ayıklama) ve `embed()` (embed oluşturma) gibi hazır yardımcılar da var, istersen komutlarında kullanabilirsin:

```js
import { userId, embed } from '../lib/util.js';

export default [{
  name: 'bilgi',
  async run(ctx) {
    const hedef = userId(ctx.args[0]) || ctx.author.id;
    await ctx.reply({ embeds: [embed({ title: 'Kullanıcı', description: `<@${hedef}>` })] });
  },
}];
```

## Komut önekini değiştirmek

`lib/config.js` içindeki `PREFIX` değerini değiştir (varsayılan: `'ap '`).
