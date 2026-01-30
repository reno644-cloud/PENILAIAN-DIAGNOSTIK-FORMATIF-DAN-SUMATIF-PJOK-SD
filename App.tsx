import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import { generateAssessmentPlan } from './services/geminiService';
import { AssessmentInput, GeneratedAssessment, LoadingState } from './types';

const App: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<GeneratedAssessment | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGenerate = async (input: AssessmentInput) => {
    setLoadingState(LoadingState.LOADING);
    setErrorMsg(null);
    setResult(null);

    try {
      const generatedData = await generateAssessmentPlan(input);
      setResult(generatedData);
      setLoadingState(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setErrorMsg("Terjadi kesalahan saat menghasilkan penilaian. Pastikan koneksi internet stabil atau coba lagi nanti.");
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/50">
                PJOK
             </div>
             <div>
               <h1 className="text-xl font-bold text-white tracking-tight leading-none">Generator PENILAIAN SD</h1>
               <p className="text-xs text-slate-400 font-medium tracking-wide">SD SUNGAISELAN</p>
             </div>
          </div>
          <div className="text-xs font-semibold px-3 py-1 bg-slate-700 text-blue-300 rounded-full border border-slate-600 hidden sm:block">
            Powered by Gemini AI
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 text-sm text-blue-200">
              <p className="font-semibold mb-1 text-blue-100">Panduan Penggunaan:</p>
              <ul className="list-disc pl-4 space-y-1 text-blue-300/90">
                <li>Isi materi, CP, dan TP dengan lengkap.</li>
                <li>Klik tombol generate.</li>
                <li>Tunggu AI menyusun tabel penilaian.</li>
                <li>Gunakan tombol "Salin" untuk memindahkan ke Word/Docs.</li>
              </ul>
            </div>
            <InputForm onSubmit={handleGenerate} loadingState={loadingState} />
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-8 xl:col-span-9 h-full min-h-[500px]">
            {loadingState === LoadingState.IDLE && (
               <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/50 p-10 text-center">
                 <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-slate-600"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14 2z"/><polyline points="14 2 14 8 20 8"/><line x1="12" x2="12" y1="18" y2="12"/><line x1="9" x2="15" y1="15" y2="15"/></svg>
                 <h3 className="text-lg font-medium text-slate-300">Belum ada hasil</h3>
                 <p className="max-w-md text-slate-500">Silakan isi formulir di sebelah kiri untuk menghasilkan rencana penilaian diagnostik, formatif, dan sumatif.</p>
               </div>
            )}

            {loadingState === LoadingState.LOADING && (
              <div className="h-full flex flex-col items-center justify-center space-y-4 border border-slate-700 rounded-xl bg-slate-800 p-10">
                 <div className="relative">
                   <div className="w-16 h-16 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
                 </div>
                 <p className="text-slate-300 font-medium animate-pulse">Sedang menyusun instrumen penilaian...</p>
                 <p className="text-xs text-slate-500">Proses ini membutuhkan waktu beberapa detik.</p>
              </div>
            )}

            {loadingState === LoadingState.ERROR && (
              <div className="h-full flex flex-col items-center justify-center border border-red-800/50 rounded-xl bg-red-900/10 p-10 text-center">
                 <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mb-4"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                 <h3 className="text-lg font-bold text-red-400">Gagal Memuat</h3>
                 <p className="text-red-300 mt-2">{errorMsg}</p>
                 <button 
                   onClick={() => setLoadingState(LoadingState.IDLE)}
                   className="mt-6 px-4 py-2 bg-slate-800 border border-red-800 text-red-400 rounded-lg hover:bg-slate-700 transition-colors"
                 >
                   Coba Lagi
                 </button>
              </div>
            )}

            {loadingState === LoadingState.SUCCESS && result && (
              <ResultDisplay htmlContent={result.htmlContent} />
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} SD SUNGAISELAN - Generator Penilaian PJOK.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;