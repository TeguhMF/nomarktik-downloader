import { useState } from 'react';

export default function App() {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'id');
  const [inputUrl, setInputUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [videoData, setVideoData] = useState(null);

  const text = {
    id: {
      title: "TikTok Downloader",
      subtitle: "Unduh video TikTok tanpa watermark dengan kualitas HD secara instan.",
      placeholder: "Tempel tautan video TikTok di sini...",
      btnDownload: "Unduh Video",
      btnProcessing: "Memproses...",
      pasteBtn: "Tempel",
      errorValid: "Masukkan URL TikTok yang valid!",      
      errorFetch: "Gagal mengambil video. Silakan coba lagi.",
      howToTitle: "Cara Mengunduh Video",
      step1: "Salin tautan video dari aplikasi TikTok.",
      step2: "Tempel tautan ke dalam kolom input di atas.",
      step3: "Klik 'Unduh Video' dan pilih format yang diinginkan.",
      feat1Title: "Kualitas HD Murni",
      feat1Desc: "Video diunduh dengan resolusi asli tanpa logo watermark.",
      feat2Title: "Konversi MP3 Audio",
      feat2Desc: "Ekstrak dan unduh bagian audio saja dalam format MP3.",
      feat3Title: "Layanan Gratis",
      feat3Desc: "Dapat digunakan sepuasnya tanpa batas harian dan tanpa registrasi.",
      highlightTitle: "Fitur Unggulan",
      highlightDesc: "Salah satu fitur unggulan NoMarkTik adalah kemampuannya menghapus watermark TikTok secara otomatis dari video yang diunduh. Dengan fitur ini, pengguna dapat memperoleh video yang lebih bersih tanpa adanya logo TikTok maupun nama pengguna yang biasanya muncul pada hasil unduhan dari aplikasi resmi. Tampilan video menjadi lebih rapi, sehingga lebih nyaman untuk disimpan sebagai arsip pribadi, dijadikan referensi, atau digunakan kembali sesuai dengan ketentuan hak cipta yang berlaku. Proses penghapusan watermark dilakukan secara cepat tanpa mengurangi kualitas visual video, sehingga pengguna tetap mendapatkan hasil unduhan yang optimal."
    },
    en: {
      title: "TikTok Downloader",
      subtitle: "Download TikTok videos without watermark in HD quality instantly.",
      placeholder: "Paste TikTok video link here...",
      btnDownload: "Download Video",
      btnProcessing: "Processing...",
      pasteBtn: "Paste",
      errorValid: "Please enter a valid TikTok URL!",
      errorFetch: "Failed to fetch video. Please try again.",
      howToTitle: "How to Download",
      step1: "Copy the video link from the TikTok app.",
      step2: "Paste the link into the input field above.",
      step3: "Click 'Download Video' and choose your preferred format.",
      feat1Title: "Pure HD Quality",
      feat1Desc: "Videos are downloaded in original resolution without watermarks.",
      feat2Title: "MP3 Audio Conversion",
      feat2Desc: "Extract and download only the audio section in MP3 format.",
      feat3Title: "Free Service",
      feat3Desc: "Unlimited daily downloads with no registration required.",
      highlightTitle: "Key Feature",
      highlightDesc: "One of the key features of NoMarkTik is its ability to automatically remove TikTok watermarks from downloaded videos. With this feature, users can obtain a cleaner video without the TikTok logo or username that typically appears on official app downloads. The video display becomes neater, making it more comfortable to save for personal archives, references, or reuse in accordance with applicable copyright regulations. The watermark removal process is performed swiftly without reducing the video's visual quality, ensuring users always get optimal download results."
    }
  };

  const handlePaste = async () => {
    try {
      const textFromClipboard = await navigator.clipboard.readText();
      setInputUrl(textFromClipboard);
      setErrorMsg('');
    } catch (err) {
      console.error("Gagal mengakses clipboard: ", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setVideoData(null);

    if (!inputUrl.includes('tiktok.com')) {
      setErrorMsg(text[lang].errorValid);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(inputUrl)}&hd=1`);
      const resData = await response.json();

      if (response.ok && resData && resData.code === 0 && resData.data) {
        setVideoData({
          title: resData.data.title || 'TikTok Video',
          author: resData.data.author?.unique_id || 'unknown',
          thumbnail: resData.data.cover || '',
          video_nowatermark: resData.data.play || resData.data.hdplay || '', 
          audio: resData.data.music || ''
        });
      } else {
        setErrorMsg(resData.msg || text[lang].errorFetch);
      }
    } catch (error) {
      console.error("Detail Error:", error);
      setErrorMsg(text[lang].errorFetch);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative overflow-hidden antialiased selection:bg-blue-100">
      
      {/* BACKGROUND GRID & NEON ORB */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)] opacity-70 pointer-events-none"></div>
      <div className="absolute top-[-20%] left-[25%] w-[600px] h-[600px] rounded-full bg-blue-400/10 blur-[120px] pointer-events-none"></div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-blue-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            NoMarkTik
          </div>
          
          <div className="flex items-center gap-3">
            {/* Selector Bahasa */}
            <div className="flex items-center bg-slate-100 rounded-lg px-2.5 py-1 border border-slate-200">
              <svg className="w-3.5 h-3.5 text-slate-400 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <select 
                value={lang} 
                onChange={(e) => { setLang(e.target.value); localStorage.setItem('lang', e.target.value); }}
                className="bg-transparent text-xs font-semibold text-slate-600 focus:outline-none cursor-pointer"
              >
                <option value="id">ID</option>
                <option value="en">EN</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* KONTEN UTAMA */}
      <main className="max-w-4xl mx-auto px-4 py-16 relative z-10">
        
        {/* HERO */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-3">
            {text[lang].title}
          </h1>
          <p className="text-base text-slate-500 max-w-lg mx-auto font-normal">
            {text[lang].subtitle}
          </p>
        </section>

        {/* INPUT CARD */}
        <section className="bg-white border border-slate-200 p-4 md:p-5 rounded-2xl shadow-sm max-w-3xl mx-auto mb-6">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1 flex items-center bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500/50 transition-all px-3.5">
              <input 
                type="text" 
                placeholder={text[lang].placeholder}
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="w-full py-3.5 bg-transparent text-sm focus:outline-none text-slate-800 font-medium placeholder:text-slate-400"
              />
              <button 
                type="button"
                onClick={handlePaste}
                className="flex items-center bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              >
                {text[lang].pasteBtn}
              </button>
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading || !inputUrl}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              )}
              {isLoading ? text[lang].btnProcessing : text[lang].btnDownload}
            </button>
          </form>

          {errorMsg && (
            <div className="mt-3 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-2 text-xs font-medium">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {errorMsg}
            </div>
          )}
        </section>

        {/* SECTION PENJELASAN FITUR UNGGULAN */}
        <section className="bg-white border border-slate-200 p-6 rounded-2xl max-w-3xl mx-auto mb-12 text-left shadow-sm">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-3 tracking-wide uppercase">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            {text[lang].highlightTitle}
          </div>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
            {text[lang].highlightDesc}
          </p>
        </section>

        {/* CONTAINER HASIL */}
        {videoData && (
          <section className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm max-w-3xl mx-auto mb-12 grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in">
            <div className="sm:col-span-1 flex flex-col items-center">
              <img 
                src={videoData.thumbnail} 
                alt="Cover" 
                className="w-full aspect-[9/16] object-cover rounded-xl border border-slate-100 shadow-sm"
              />
              <p className="mt-2.5 text-xs font-semibold text-blue-600">@{videoData.author}</p>
            </div>
            
            <div className="sm:col-span-2 flex flex-col justify-between py-1">
              <div>
                <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md text-xs font-semibold inline-block mb-3">
                  ✓ Konten Ditemukan
                </span>
                <p className="text-sm font-normal text-slate-600 line-clamp-3 bg-slate-50 p-3 rounded-xl border border-slate-100 italic">
                  "{videoData.title}"
                </p>
              </div>

              <div className="space-y-2 mt-4 sm:mt-0">
                <a 
                  href={videoData.video_nowatermark} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all text-xs"
                >
                  Unduh Video (No Watermark)
                </a>
                <a 
                  href={videoData.audio} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all text-xs"
                >
                  Unduh Audio MP3
                </a>
              </div>
            </div>
          </section>
        )}

        {/* TIGA BLOK FITUR */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
          <div className="bg-white border border-slate-200 p-5 rounded-xl">
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">{text[lang].feat1Title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">{text[lang].feat1Desc}</p>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-xl">
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">{text[lang].feat2Title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">{text[lang].feat2Desc}</p>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-xl">
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">{text[lang].feat3Title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">{text[lang].feat3Desc}</p>
          </div>
        </section>

        {/* PANDUAN CARA PAKAI */}
        <section className="bg-white border border-slate-200 p-6 md:p-7 rounded-2xl max-w-3xl mx-auto text-left">
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            {text[lang].howToTitle}
          </h2>
          <ul className="space-y-3 text-xs text-slate-600 font-normal">
            <li className="flex gap-2"><span className="text-blue-600 font-bold">1.</span> {text[lang].step1}</li>
            <li className="flex gap-2"><span className="text-blue-600 font-bold">2.</span> {text[lang].step2}</li>
            <li className="flex gap-2"><span className="text-blue-600 font-bold">3.</span> {text[lang].step3}</li>
          </ul>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="text-center py-8 text-[11px] text-slate-400 border-t border-slate-200 bg-white mt-16 relative z-10">
        <p className="mb-1.5">© 2026 TMF PRODUCTION. All rights reserved.</p>
        <p className="max-w-md mx-auto px-4 opacity-70 leading-normal">Disclaimer: We are not affiliated, authorized, or in any way officially connected with TikTok Inc.</p>
      </footer>
    </div>
  );
}