import { GoogleGenAI } from "@google/genai";
import { AssessmentInput, GeneratedAssessment } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAssessmentPlan = async (input: AssessmentInput): Promise<GeneratedAssessment> => {
  const model = "gemini-3-flash-preview";

  const prompt = `
    Bertindaklah sebagai ahli kurikulum PJOK (Pendidikan Jasmani, Olahraga, dan Kesehatan) untuk tingkat Sekolah Dasar (SD) di Indonesia.
    Tugas Anda adalah membuat Rencana Penilaian Terstruktur yang komprehensif berdasarkan input berikut:

    Identitas Sekolah:
    Nama Sekolah: ${input.namaSekolah}
    Kelas: ${input.kelas}
    Fase: ${input.fase}

    Detail Pembelajaran:
    Materi Pembelajaran: ${input.materi}
    Capaian Pembelajaran (CP): ${input.capaianPembelajaran}
    Tujuan Pembelajaran (TP): ${input.tujuanPembelajaran}

    Instruksi Output:
    1. Tentukan "Topik Pembelajaran" yang spesifik berdasarkan input TP dan CP.
    2. Buat konten HTML yang valid (tanpa markdown backticks) yang berisi 3 bagian utama dalam bentuk TABEL agar mudah disalin ke Microsoft Word.
    3. Gunakan inline style "color: black;" untuk semua teks di dalam tabel dan heading untuk memastikan hasil copy-paste berwarna hitam.
    4. Pastikan Identitas Sekolah (Nama Sekolah, Kelas, Fase) tercantum dengan jelas di bagian atas dokumen.
    5. Struktur tabel DIAGNOSTIK harus dipisah menjadi Non-Kognitif dan Kognitif.
    
    6. **KHUSUS PENILAIAN FORMATIF:** 
       Buat tabel format LEMBAR PENILAIAN SISWA. 
       Kolom wajib: No, Nama Peserta Didik, [Aspek 1: Generate indikator spesifik sesuai materi], [Aspek 2: Generate indikator spesifik], [Aspek 3: Generate indikator spesifik], Skor/Predikat.

    7. **KHUSUS PENILAIAN SUMATIF (TES KINERJA/PRAKTIK):**
       Buat tabel format LEMBAR PENILAIAN SISWA.
       Kolom wajib: No, Nama Peserta Didik, [Aspek Teknik 1], [Aspek Teknik 2], [Aspek Teknik 3], Nilai Akhir.
    
    8. **KHUSUS PENILAIAN SUMATIF (TES TERTULIS):**
       Sebelum butir soal, tambahkan format isian "Nama Peserta Didik: ......." dan "Kelas: ........".
       Soal Pilihan Ganda TANPA label skor per soal. Soal Esai DENGAN label skor.

    9. **KHUSUS REKAPITULASI NILAI:**
       Tambahkan RUMUS PENILAIAN yang disinkronkan otomatis oleh Anda (AI) berdasarkan komponen penilaian di atas.
       Contoh Rumus: Nilai Akhir = (Rata-rata Formatif + Nilai Sumatif Praktik + Nilai Sumatif Tulis) / 3.

    Struktur Konten HTML yang Wajib Dibuat:
    
    <div style="text-align: center; margin-bottom: 20px; color: black;">
      <h1 style="color: black;">INSTRUMEN PENILAIAN PJOK</h1>
      <h2 style="margin-top: 5px; color: black;">${input.namaSekolah.toUpperCase()}</h2>
    </div>

    <table border="0" style="width: 100%; margin-bottom: 20px; color: black;">
      <tr>
        <td style="width: 20%; color: black;"><strong>Nama Sekolah</strong></td>
        <td style="width: 2%; color: black;">:</td>
        <td style="color: black;">${input.namaSekolah}</td>
      </tr>
      <tr>
        <td style="color: black;"><strong>Kelas / Fase</strong></td>
        <td style="color: black;">:</td>
        <td style="color: black;">${input.kelas} / ${input.fase}</td>
      </tr>
      <tr>
        <td style="color: black;"><strong>Materi</strong></td>
        <td style="color: black;">:</td>
        <td style="color: black;">${input.materi}</td>
      </tr>
      <tr>
        <td style="color: black;"><strong>Topik</strong></td>
        <td style="color: black;">:</td>
        <td style="color: black;">[Isi Topik Hasil Generate Disini]</td>
      </tr>
      <tr>
        <td style="vertical-align: top; color: black;"><strong>Capaian Pembelajaran</strong></td>
        <td style="vertical-align: top; color: black;">:</td>
        <td style="color: black;">${input.capaianPembelajaran}</td>
      </tr>
      <tr>
        <td style="vertical-align: top; color: black;"><strong>Tujuan Pembelajaran</strong></td>
        <td style="vertical-align: top; color: black;">:</td>
        <td style="color: black;">${input.tujuanPembelajaran}</td>
      </tr>
    </table>

    <hr style="border: 1px solid black; margin-bottom: 20px;">

    <h2 style="color: black;">1. PENILAIAN DIAGNOSTIK (AWAL)</h2>
    <p style="color: black;">Dilakukan sebelum pembelajaran dimulai untuk memetakan kemampuan awal.</p>

    <h3 style="color: black;">A. Diagnostik Non-Kognitif</h3>
    <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; border: 1px solid black; color: black;">
      <thead>
        <tr style="background-color: #f0f0f0;">
          <th style="border: 1px solid black; color: black; width: 5%; text-align: center;">No</th>
          <th style="border: 1px solid black; color: black;">Pertanyaan</th>
          <th style="border: 1px solid black; color: black; width: 10%; text-align: center;">Ya</th>
          <th style="border: 1px solid black; color: black; width: 10%; text-align: center;">Tidak</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid black; color: black; text-align: center;">1</td>
          <td style="border: 1px solid black; color: black;">[Buatkan Pertanyaan tentang minat/kesukaan siswa terhadap olahraga ini]</td>
          <td style="border: 1px solid black; color: black;"></td>
          <td style="border: 1px solid black; color: black;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid black; color: black; text-align: center;">2</td>
          <td style="border: 1px solid black; color: black;">[Buatkan Pertanyaan tentang gaya belajar]</td>
          <td style="border: 1px solid black; color: black;"></td>
          <td style="border: 1px solid black; color: black;"></td>
        </tr>
      </tbody>
    </table>

    <h3 style="color: black;">B. Diagnostik Kognitif</h3>
    <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; border: 1px solid black; color: black;">
      <thead>
        <tr style="background-color: #f0f0f0;">
          <th style="border: 1px solid black; color: black; width: 5%; text-align: center;">No</th>
          <th style="border: 1px solid black; color: black;">Pertanyaan (Sinkronisasi dengan TP & Materi)</th>
          <th style="border: 1px solid black; color: black; width: 15%; text-align: center;">Skor</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid black; color: black; text-align: center;">1</td>
          <td style="border: 1px solid black; color: black;">[Buatkan pertanyaan pemantik pengetahuan awal tentang materi ${input.materi}]</td>
          <td style="border: 1px solid black; color: black;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid black; color: black; text-align: center;">2</td>
          <td style="border: 1px solid black; color: black;">[Buatkan pertanyaan pemantik kedua]</td>
          <td style="border: 1px solid black; color: black;"></td>
        </tr>
      </tbody>
    </table>

    <h2 style="color: black;">2. PENILAIAN FORMATIF (PROSES)</h2>
    <p style="color: black;">Dilakukan selama proses pembelajaran. Isi kolom aspek dengan indikator spesifik materi ini.</p>
    
    <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; border: 1px solid black; color: black;">
      <thead>
        <tr style="background-color: #f0f0f0;">
          <th style="border: 1px solid black; color: black; width: 5%; text-align: center;">No</th>
          <th style="border: 1px solid black; color: black; width: 25%;">Nama Peserta Didik</th>
          <th style="border: 1px solid black; color: black;">[Aspek 1: Buatkan Indikator Sikap/Profil Pelajar Pancasila yang relevan]</th>
          <th style="border: 1px solid black; color: black;">[Aspek 2: Buatkan Indikator Pemahaman Konsep]</th>
          <th style="border: 1px solid black; color: black;">[Aspek 3: Buatkan Indikator Keterampilan Proses]</th>
          <th style="border: 1px solid black; color: black; width: 10%; text-align: center;">Skor Total</th>
        </tr>
      </thead>
      <tbody>
        <!-- Contoh Baris Kosong untuk Guru -->
        <tr>
          <td style="border: 1px solid black; color: black; text-align: center;">1</td>
          <td style="border: 1px solid black; color: black;"></td>
          <td style="border: 1px solid black; color: black;"></td>
          <td style="border: 1px solid black; color: black;"></td>
          <td style="border: 1px solid black; color: black;"></td>
          <td style="border: 1px solid black; color: black;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid black; color: black; text-align: center;">2</td>
          <td style="border: 1px solid black; color: black;"></td>
          <td style="border: 1px solid black; color: black;"></td>
          <td style="border: 1px solid black; color: black;"></td>
          <td style="border: 1px solid black; color: black;"></td>
          <td style="border: 1px solid black; color: black;"></td>
        </tr>
         <tr>
          <td style="border: 1px solid black; color: black; text-align: center;">3</td>
          <td style="border: 1px solid black; color: black;"></td>
          <td style="border: 1px solid black; color: black;"></td>
          <td style="border: 1px solid black; color: black;"></td>
          <td style="border: 1px solid black; color: black;"></td>
          <td style="border: 1px solid black; color: black;"></td>
        </tr>
      </tbody>
    </table>
    <p style="font-size: 0.9em; color: black;">*Rentang Skor: 1-4 atau 10-100 (sesuai kebijakan sekolah)</p>

    <h2 style="color: black;">3. PENILAIAN SUMATIF (AKHIR)</h2>
    
    <h3 style="color: black;">A. Tes Kinerja (Praktik)</h3>
    <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; border: 1px solid black; color: black;">
      <thead>
        <tr style="background-color: #f0f0f0;">
          <th style="border: 1px solid black; color: black; width: 5%; text-align: center;">No</th>
          <th style="border: 1px solid black; color: black; width: 25%;">Nama Peserta Didik</th>
          <th style="border: 1px solid black; color: black;">[Aspek 1: Buatkan Teknik Dasar Spesifik 1]</th>
          <th style="border: 1px solid black; color: black;">[Aspek 2: Buatkan Teknik Dasar Spesifik 2]</th>
          <th style="border: 1px solid black; color: black;">[Aspek 3: Buatkan Teknik/Penerapan Aturan]</th>
          <th style="border: 1px solid black; color: black; width: 10%; text-align: center;">Nilai</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid black; color: black; text-align: center;">1</td>
          <td style="border: 1px solid black; color: black;"></td>
          <td style="border: 1px solid black; color: black;"></td>
          <td style="border: 1px solid black; color: black;"></td>
          <td style="border: 1px solid black; color: black;"></td>
          <td style="border: 1px solid black; color: black;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid black; color: black; text-align: center;">2</td>
          <td style="border: 1px solid black; color: black;"></td>
          <td style="border: 1px solid black; color: black;"></td>
          <td style="border: 1px solid black; color: black;"></td>
          <td style="border: 1px solid black; color: black;"></td>
          <td style="border: 1px solid black; color: black;"></td>
        </tr>
      </tbody>
    </table>

    <h3 style="color: black;">B. Ujian Tertulis</h3>
    <div style="margin-bottom: 20px; color: black;">
        <p style="color: black; margin-bottom: 5px;">Nama Peserta Didik : ........................................................................</p>
        <p style="color: black;">Kelas : ........................................................................</p>
    </div>

    <p style="color: black;"><strong>I. Pilihan Ganda</strong></p>
    <div style="margin-left: 20px; color: black;">
       Buatkan <strong>15 Soal Pilihan Ganda</strong>.
       <br>
       Format:
       <br>
       1. Pertanyaan...
       <br>
       a. ...
       b. ...
       c. ...
       d. ...
       <br>(JANGAN ADA KETERANGAN SKOR DI SINI)
    </div>

    <p style="color: black; margin-top: 15px;"><strong>II. Esai</strong></p>
    <div style="margin-left: 20px; color: black;">
       Buatkan <strong>5 Soal Esai</strong>.
       <br>
       Format:
       <br>
       1. Pertanyaan... (Skor: 5)
    </div>

    <br>
    <hr style="border: 1px solid black; margin-bottom: 20px;">

    <h2 style="color: black;">4. REKAPITULASI NILAI</h2>
    
    <table border="0" style="width: 100%; margin-bottom: 10px; color: black;">
      <tr>
        <td style="width: 150px; color: black;"><strong>Nama Peserta Didik</strong></td>
        <td style="width: 10px; color: black;">:</td>
        <td style="border-bottom: 1px solid black; color: black;"></td>
        <td style="width: 20px;"></td>
        <td style="width: 50px; color: black;"><strong>Kelas</strong></td>
        <td style="width: 10px; color: black;">:</td>
        <td style="border-bottom: 1px solid black; color: black;">${input.kelas}</td>
      </tr>
    </table>

    <p style="color: black;"><strong>Rumus Nilai Akhir:</strong> <span style="background-color: #f0f0f0; padding: 2px 5px;">[Buatkan rumus matematika sederhana untuk menghitung nilai akhir berdasarkan komponen Formatif, Sumatif Praktik, dan Sumatif Tulis di atas. Contoh: NA = (2xFormatif + 1xPraktik + 1xTulis)/4 atau Rata-rata dari ketiganya]</span></p>

    <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; border: 1px solid black; color: black;">
      <thead>
        <tr style="background-color: #f0f0f0;">
          <th style="border: 1px solid black; color: black;">Jenis Penilaian</th>
          <th style="border: 1px solid black; color: black;">Komponen / Instrumen</th>
          <th style="border: 1px solid black; color: black; text-align: center;">Rentang Skor</th>
          <th style="border: 1px solid black; color: black; width: 20%; text-align: center;">Nilai Perolehan</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowspan="3" style="border: 1px solid black; color: black; vertical-align: middle;"><strong>FORMATIF (PROSES)</strong></td>
          <td style="border: 1px solid black; color: black;">Observasi Lapangan (Sikap/Keterampilan)</td>
          <td style="border: 1px solid black; color: black; text-align: center;">10 - 100</td>
          <td style="border: 1px solid black; color: black;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid black; color: black;">Penilaian Antar Teman</td>
          <td style="border: 1px solid black; color: black; text-align: center;">10 - 100</td>
          <td style="border: 1px solid black; color: black;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid black; color: black;">Kuis Singkat</td>
          <td style="border: 1px solid black; color: black; text-align: center;">10 - 100</td>
          <td style="border: 1px solid black; color: black;"></td>
        </tr>
        <tr>
          <td rowspan="3" style="border: 1px solid black; color: black; vertical-align: middle;"><strong>SUMATIF (AKHIR)</strong></td>
          <td style="border: 1px solid black; color: black;">Tes Kinerja (Praktik)</td>
          <td style="border: 1px solid black; color: black; text-align: center;">10 - 100</td>
          <td style="border: 1px solid black; color: black;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid black; color: black;">Tes Tertulis</td>
          <td style="border: 1px solid black; color: black; text-align: center;">10 - 100</td>
          <td style="border: 1px solid black; color: black;"></td>
        </tr>
        <tr>
          <td style="border: 1px solid black; color: black;">Proyek Mandiri</td>
          <td style="border: 1px solid black; color: black; text-align: center;">10 - 100</td>
          <td style="border: 1px solid black; color: black;"></td>
        </tr>
        <tr style="background-color: #e0e7ff;">
          <td colspan="3" style="border: 1px solid black; color: black; text-align: right; font-weight: bold;">NILAI AKHIR (Sesuai Rumus)</td>
          <td style="border: 1px solid black; color: black;"></td>
        </tr>
      </tbody>
    </table>

    Pastikan bahasa yang digunakan mudah dipahami oleh siswa SD dan guru. Output HANYA HTML body content, tidak perlu tag html/head/body.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    const text = response.text;
    
    // Extract topic roughly if needed, otherwise rely on the content
    // We will just return the full HTML string as the content.
    // Clean up any markdown code blocks if the AI accidentally adds them
    const cleanHtml = text.replace(/```html/g, '').replace(/```/g, '');

    return {
      htmlContent: cleanHtml,
      topic: "Topik Disesuaikan AI", // We let AI put the topic inside the HTML
    };
  } catch (error) {
    console.error("Error generating assessment:", error);
    throw error;
  }
};