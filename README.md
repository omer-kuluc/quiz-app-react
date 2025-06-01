# 🧠 Frontend Quiz App – React

Kategorilere göre frontend bilgilerini test etmeye olanak tanıyan bir quiz uygulaması.  
Kullanıcı dostu arayüzü ve anında geri bildirim özelliğiyle sade ve verimli bir deneyim sunar.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3)

## 🔗 Canlı Demo

👉 [https://quiz-app-react-murex-ten.vercel.app/](https://quiz-app-react-murex-ten.vercel.app/)

---

##  Proje Özeti

**Quiz App**, kullanıcıların HTML, CSS, JavaScript ve Erişilebilirlik (Accessibility) gibi frontend konularında bilgi seviyelerini test etmelerine olanak tanır.  

Uygulama, her kategoriye özel soruları göstererek seçilen cevabın doğru ya da yanlış olduğunu anında görsel olarak belirtir.

---

##  Özellikler

### ✅ Kategori Seçimi

- HTML, CSS, JavaScript ve Accessibility olmak üzere 4 kategori sunar.
- Başlangıç ekranında kullanıcı istediği konuyu seçebilir.

###  Tema Değiştirme (Dark / Light)

- Sayfanın sağ üst köşesindeki butonla tema değiştirilebilir.
- Tema tercihi `localStorage` ile saklanır, sayfa yenilendiğinde bile hatırlanır.

![image](https://github.com/user-attachments/assets/8d368abc-cc5f-4b13-bcb0-8721c2cd3241)


###  Soru-Cevap Mantığı

- Her soru için dört seçenek sunulur.
- Cevap seçildiğinde doğruysa yeşil, yanlışsa kırmızıyla işaretlenir.
- Yanlış cevaplarda kısa bir **sallanma animasyonu**, doğru cevapta ise büyüyüp küçülme efekti görülür.
- Cevap verildikten sonra ilerlemek için bir "Next Question" butonu görünür.

###  Sonuç Ekranı

- Tüm sorular cevaplandıktan sonra toplam doğru cevap sayısı gösterilir.
- Kullanıcı "Play Again" butonuyla tekrar quiz çözmeye başlayabilir.

###  Bileşen Yapısı

- Uygulama, React bileşenlerine bölünerek yapılandırılmıştır:
  - WelcomeScreen
  - Questions
  - Header
  - ResultScreen

### 📱 Duyarlı Tasarım

- Mobil, tablet ve masaüstü ekranlarda düzgün çalışır.

---

## Kullanılan Teknolojiler

- React  
- JavaScript (ES6+)  
- CSS3  
- localStorage  
- Basit CSS Animasyonları

---

##  Kurulum ve Çalıştırma

### 1. Depoyu Klonla

```bash
git clone https://github.com/kullanici-adi/quiz-app-react.git
```

### 2. Dizin Değiştir

```bash
cd quiz-app-react
```

### 3. Gerekli Paketleri Kur

```bash
npm install
```

### 4. Uygulamayı Başlat

```bash
npm run dev
```

Uygulama varsayılan olarak [http://localhost:5173](http://localhost:5173) adresinde çalışacaktır.

---

## Hedefler

- Kategorilere göre bilgi ölçümü  
- Tema tercihinin kalıcı olması  
- Anında görsel geri bildirim  
- Basit ve anlaşılır kullanıcı arayüzü  

---

> Bu proje, frontend becerilerini geliştirme amacıyla oluşturulmuştur. Katkı sağlamak isteyen herkese açıktır!
