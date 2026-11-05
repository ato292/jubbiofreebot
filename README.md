# jubbiofreebot

📦 CODESPACES İLE KURULUM (bilgisayara hiçbir şey kurmadan, tarayıcıdan)

	1.	Repo'nun GitHub sayfasına git.
	2.	Sağ üstteki yeşil "Code" butonuna bas.
	3.	Açılan menüden "Codespaces" sekmesine geç.
	4.	"Create codespace on main" yazan butona bas.
	5.	Birkaç saniye-dakika bekle, tarayıcıda bir kod editörü açılacak (Visual Studio Code'un tarayıcı versiyonu gibi).
	6.	Alt tarafta bir "Terminal" penceresi göreceksin (yoksa üstten Terminal > New Terminal).
	7.	Terminale şunu yaz ve Enter'a bas:

npm install

Bu, botun çalışması için gereken dosyaları indirir, biraz sürebilir, bitene kadar bekle.
	8.	Sol taraftaki dosya listesinde .env.example dosyasına sağ tıkla, "Rename" (yeniden adlandır) de ve adını .env yap (yani sondaki ".example" kısmını sil).
	9.	Açtığın .env dosyasının içine, Jubbio bot tokenini yapıştır. İçi şöyle görünmeli:

BOT_TOKEN=buraya_kendi_tokenini_yapıştır

	10.	Kaydet (Ctrl+S / Cmd+S).
	11.	Terminale şunu yaz ve Enter'a bas:

node index.js

	12.	Terminalde "Bot hazır" yazısını görürsen bot çalışıyor demektir.
	13.	Discord/Jubbio sunucunda ap ping yaz, bot sana cevap verecek.

💻 VISUAL STUDIO CODE İLE KURULUM (kendi bilgisayarında)

	1.	Bilgisayarında Node.js kurulu değilse, nodejs.org adresine git, "LTS" yazan sürümü indir ve kur (hep "İleri/Next" diyerek kurulur).
	2.	Visual Studio Code kurulu değilse, code.visualstudio.com adresinden indir ve kur.
	3.	Botun dosyalarını (zip) bilgisayarına indir, sağ tıklayıp "Tümünü Çıkart / Extract All" ile bir klasöre çıkart.
	4.	Visual Studio Code'u aç.
	5.	Üst menüden File > Open Folder (Dosya > Klasör Aç) de, az önce çıkarttığın klasörü seç.
	6.	Üst menüden Terminal > New Terminal (Terminal > Yeni Terminal) de, alt tarafta bir yazı yazma ekranı açılacak.
	7.	O ekrana şunu yaz, Enter'a bas:

npm install

Bitmesini bekle.
	8.	Sol taraftaki dosya listesinde .env.example dosyasına sağ tıkla, "Rename" de, adını .env yap.
	9.	O dosyayı aç, içine Jubbio bot tokenini yapıştır:

BOT_TOKEN=buraya_kendi_tokenini_yapıştır

	10.	Kaydet (Ctrl+S).
	11.	Terminale şunu yaz, Enter'a bas:

node index.js

	12.	"Bot hazır" yazısını görürsen çalışıyor demektir.
	13.	Discord/Jubbio sunucunda ap ping yaz, test et.
