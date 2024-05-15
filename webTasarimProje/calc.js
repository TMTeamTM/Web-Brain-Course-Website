// Sayfa yüklendiğinde mevcut tarihi date input'lara yaz
var currentDate = new Date().toISOString().split('T')[0];
document.getElementById("baslangicDate").value = currentDate;
document.getElementById("bitisDate").value = currentDate;

// Baslangic tarihi degistiginde bitis tarihinden onceki tarih secilmesini engelle
document.getElementById("baslangicDate").addEventListener("change", function () {
    var selectedStartDate = new Date(this.value);
    var selectedEndDate = new Date(document.getElementById("bitisDate").value);
    if (selectedStartDate > selectedEndDate) {
        document.getElementById("bitisDate").value = this.value;
    }
});

// Bitis tarihi degistiginde baslangic tarihinden sonraki tarih secilmesini engelle
document.getElementById("bitisDate").addEventListener("change", function () {
    var selectedEndDate = new Date(this.value);
    var selectedStartDate = new Date(document.getElementById("baslangicDate").value);
    if (selectedEndDate < selectedStartDate) {
        document.getElementById("baslangicDate").value = this.value;
    }
});

// Checkbox'lar, radio button'lar ve tarih alanları değiştiğinde fişi güncelle
document.querySelectorAll('input[type="checkbox"]').forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
        updateReceipt();
    });
});

document.querySelectorAll('input[name="yas"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
        updateReceipt();
    });
});

document.getElementById("baslangicDate").addEventListener("change", function () {
    updateReceipt();
});

document.getElementById("bitisDate").addEventListener("change", function () {
    updateReceipt();
});

// Hesapla düğmesine tıklama olayı
document.getElementById("hesaplaBtn").addEventListener("click", function () {
    updateReceipt(true); // true parametresiyle toplam fiyatı güncelle
});

// Fişi güncelleyen fonksiyon
function updateReceipt(updateTotalPrice) {
    var dersMetni = "";
    var tarihBaslangicMetni = "";
    var tarihBitisMetni = "";

    // Yaşa göre fiyat ekle
    var yas = document.querySelector('input[name="yas"]:checked').value;
    if (yas === "genc") {
        document.getElementById("statu-durumu").textContent = "Genç";
    } else if (yas === "yetiskin") {
        document.getElementById("statu-durumu").textContent = "Yetişkin";
    }

    // Checkbox'lara göre fiyat ekle
    if (document.getElementById("htmlCb").checked) {
        dersMetni += "HTML ";
    }
    if (document.getElementById("cssCb").checked) {
        dersMetni += "CSS ";
    }
    if (document.getElementById("jsCb").checked) {
        dersMetni += "JavaScript ";
    }
    if (document.getElementById("phpCb").checked) {
        dersMetni += "PHP ";
    }

    // Tarihleri al
    var baslangicDate = new Date(document.getElementById("baslangicDate").value);
    var bitisDate = new Date(document.getElementById("bitisDate").value);

    // Tarih formatı
    var options = { year: 'numeric', month: 'long', day: 'numeric' };

    // Tarihlerin fişe eklenmesi
    tarihBaslangicMetni += "Başlangıç Tarihi: " + baslangicDate.toLocaleDateString('tr-TR', options) + " ";
    tarihBitisMetni += "Bitiş Tarihi: " + bitisDate.toLocaleDateString('tr-TR', options);

    // Fişi güncelle
    document.getElementById("ders-durumu").textContent = dersMetni;
    document.getElementById("tarih-baslangic-durumu").textContent = tarihBaslangicMetni;
    document.getElementById("tarih-bitis-durumu").textContent = tarihBitisMetni;

    // Eğer toplam fiyatı güncellememiz gerekiyorsa
    if (updateTotalPrice) {
        var toplamFiyat = 0;

        // Yaşa göre fiyat ekle
        if (yas === "genc") {
            toplamFiyat += 50;
        } else if (yas === "yetiskin") {
            toplamFiyat += 100;
        }

        // Checkbox'lara göre fiyat ekle
        if (document.getElementById("htmlCb").checked) {
            toplamFiyat += 50;
        }
        if (document.getElementById("cssCb").checked) {
            toplamFiyat += 50;
        }
        if (document.getElementById("jsCb").checked) {
            toplamFiyat += 100;
        }
        if (document.getElementById("phpCb").checked) {
            toplamFiyat += 150;
        }

        // Tarih farkına göre fiyat ekle
        var gunFarki = (bitisDate - baslangicDate) / (1000 * 60 * 60 * 24);
        if (gunFarki > 0) {
            toplamFiyat *= gunFarki;
        }

        // Fişi güncelle
        document.getElementById("statu-fiyat-durumu").textContent = toplamFiyat.toFixed(2) + " TL";
    }
}


// Ekran çözünürlüğüne bağlı olarak div'i kaydırma
function checkResolutionAndScroll() {
    if (window.innerWidth <= 1040) {
        var fisDiv = document.getElementById("fis");
        fisDiv.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

// Hesapla düğmesine tıklama olayı
document.getElementById("hesaplaBtn").addEventListener("click", function () {
    updateReceipt(true); // true parametresiyle toplam fiyatı güncelle
    checkResolutionAndScroll(); // Ekran çözünürlüğüne göre div'i kaydır
});
