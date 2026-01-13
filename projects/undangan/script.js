// 1. Inisialisasi Animasi AOS
AOS.init({
    duration: 1200, // Durasi animasi lebih lambat biar elegan
    once: true,
});

// 2. Tanggal Pernikahan (Format: Bulan Tanggal, Tahun Jam:Menit:Detik)
const weddingDate = new Date("Oct 20, 2024 08:00:00").getTime();

// 3. Fungsi Buka Undangan
function bukaUndangan() {
    const cover = document.getElementById('cover');
    const main = document.getElementById('main-content');
    const musicBtn = document.getElementById('music-control');
    
    // Animasi geser ke atas
    cover.classList.add('open');
    
    // Tampilkan konten & tombol musik
    setTimeout(() => {
        main.classList.remove('locked');
        main.classList.add('unlocked');
        musicBtn.classList.remove('hidden');
        AOS.refresh(); 
    }, 800);

    // Mainkan Musik
    putarMusik();
}

// 4. Kontrol Musik
const audio = document.getElementById('bg-music');
let isPlaying = false;

function putarMusik() {
    audio.play().then(() => {
        isPlaying = true;
    }).catch(err => {
        console.log("Autoplay dicegah browser, perlu interaksi manual");
        isPlaying = false;
    });
}

function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        document.querySelector('#music-control i').classList.remove('fa-spin');
    } else {
        audio.play();
        document.querySelector('#music-control i').classList.add('fa-spin');
    }
    isPlaying = !isPlaying;
}

// 5. Hitung Mundur (Countdown) - FIXED JAM/MENIT/DETIK
const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Perhitungan Waktu
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Masukkan ke Element HTML
    document.getElementById("hari").innerText = days;
    document.getElementById("jam").innerText = hours;
    document.getElementById("menit").innerText = minutes;
    document.getElementById("detik").innerText = seconds;

    // Jika waktu habis
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "<h2 style='color:var(--gold)'>Alhamdulillah Sah!</h2>";
    }
}, 1000);

// 6. Salin Teks (Rekening/Alamat)
function salinTeks(teks) {
    navigator.clipboard.writeText(teks).then(() => {
        alert("Berhasil menyalin: " + teks);
    }).catch(err => {
        console.error("Gagal menyalin", err);
    });
}

// 7. Kirim Pesan WhatsApp
function kirimWA() {
    const sender = document.getElementById('sender').value;
    const status = document.getElementById('status').value;
    const message = document.getElementById('message').value;

    if(sender === "") {
        alert("Silakan isi nama Anda terlebih dahulu");
        return;
    }

    const nomorWA = "6281234567890"; // Ganti Nomor WA Anda di sini
    const text = `Halo, saya ${sender}.%0AStatus: ${status}%0APesan: ${message}`;
    
    window.open(`https://wa.me/${nomorWA}?text=${text}`, '_blank');
}

// 8. Ambil Nama Tamu (URL Parameter)
const params = new URLSearchParams(window.location.search);
const tamu = params.get('to');
if(tamu) {
    document.getElementById('guest-name').innerText = tamu;
}