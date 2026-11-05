// Ato TARAFINDAN yapılmıştır
// Örnek komut. Yeni bir komut eklemek istersen bu dosyayı kopyalayıp düzenlemen yeterli —
// commands/ klasöründeki her .js dosyası bot açılırken otomatik olarak yüklenir.
export default [
  {
    name: 'ping',
    aliases: ['pong'],
    async run(ctx) {
      const start = Date.now();
      await ctx.reply('🏓 Pong!');
      const ms = Date.now() - start;
      await ctx.send(`⏱️ Gecikme: **${ms}ms**`);
    },
  },
];
