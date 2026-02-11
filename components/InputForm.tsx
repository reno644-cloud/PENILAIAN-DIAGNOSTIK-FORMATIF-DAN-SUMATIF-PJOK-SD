import React, { useState } from 'react';
import { AssessmentInput, LoadingState } from '../types';

interface InputFormProps {
  onSubmit: (data: AssessmentInput) => void;
  loadingState: LoadingState;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, loadingState }) => {
  const [formData, setFormData] = useState<AssessmentInput>({
    namaSekolah: '',
    kelas: '',
    fase: '',
    materi: '',
    capaianPembelajaran: '',
    tujuanPembelajaran: '',
  });

  const [errors, setErrors] = useState<Partial<AssessmentInput>>({});

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof AssessmentInput]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<AssessmentInput> = {};
    if (!formData.namaSekolah.trim()) newErrors.namaSekolah = 'Nama Sekolah wajib diisi.';
    if (!formData.kelas.trim()) newErrors.kelas = 'Kelas wajib diisi.';
    if (!formData.fase.trim()) newErrors.fase = 'Fase wajib diisi.';
    if (!formData.materi.trim()) newErrors.materi = 'Materi wajib diisi.';
    if (!formData.capaianPembelajaran.trim()) newErrors.capaianPembelajaran = 'Capaian Pembelajaran wajib diisi.';
    if (!formData.tujuanPembelajaran.trim()) newErrors.tujuanPembelajaran = 'Tujuan Pembelajaran wajib diisi.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const isLoading = loadingState === LoadingState.LOADING;

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        PENILAIAN PJOK_SD ( RPPM )
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Identitas Sekolah */}
        <div className="space-y-4 pt-2 pb-4 border-b border-slate-700">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Identitas Sekolah</h3>
          
          <div>
            <label htmlFor="namaSekolah" className="block text-sm font-medium text-slate-300 mb-1">
              Nama Sekolah
            </label>
            <input
              type="text"
              id="namaSekolah"
              name="namaSekolah"
              value={formData.namaSekolah}
              onChange={handleChange}
              placeholder="Contoh: SD NEGERI 1..."
              className={`w-full px-4 py-2 rounded-lg bg-slate-700 border text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.namaSekolah ? 'border-red-500 bg-red-900/10' : 'border-slate-600'}`}
              disabled={isLoading}
            />
            {errors.namaSekolah && <p className="text-red-400 text-xs mt-1">{errors.namaSekolah}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="kelas" className="block text-sm font-medium text-slate-300 mb-1">
                Kelas
              </label>
              <input
                type="text"
                id="kelas"
                name="kelas"
                value={formData.kelas}
                onChange={handleChange}
                placeholder="Contoh: 1, 4, atau 6"
                className={`w-full px-4 py-2 rounded-lg bg-slate-700 border text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.kelas ? 'border-red-500 bg-red-900/10' : 'border-slate-600'}`}
                disabled={isLoading}
              />
              {errors.kelas && <p className="text-red-400 text-xs mt-1">{errors.kelas}</p>}
            </div>
            <div>
              <label htmlFor="fase" className="block text-sm font-medium text-slate-300 mb-1">
                Fase
              </label>
              <input
                type="text"
                id="fase"
                name="fase"
                value={formData.fase}
                onChange={handleChange}
                placeholder="Contoh: A, B, atau C"
                className={`w-full px-4 py-2 rounded-lg bg-slate-700 border text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.fase ? 'border-red-500 bg-red-900/10' : 'border-slate-600'}`}
                disabled={isLoading}
              />
              {errors.fase && <p className="text-red-400 text-xs mt-1">{errors.fase}</p>}
            </div>
          </div>
        </div>

        {/* Informasi Pembelajaran */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Informasi Pembelajaran</h3>
          
          <div>
            <label htmlFor="materi" className="block text-sm font-medium text-slate-300 mb-1">
              Materi Pembelajaran PJOK
            </label>
            <input
              type="text"
              id="materi"
              name="materi"
              value={formData.materi}
              onChange={handleChange}
              placeholder="Contoh: Permainan Bola Besar (Sepak Bola)"
              className={`w-full px-4 py-2 rounded-lg bg-slate-700 border text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.materi ? 'border-red-500 bg-red-900/10' : 'border-slate-600'}`}
              disabled={isLoading}
            />
            {errors.materi && <p className="text-red-400 text-xs mt-1">{errors.materi}</p>}
          </div>

          <div>
            <label htmlFor="capaianPembelajaran" className="block text-sm font-medium text-slate-300 mb-1">
              Capaian Pembelajaran (CP)
            </label>
            <textarea
              id="capaianPembelajaran"
              name="capaianPembelajaran"
              value={formData.capaianPembelajaran}
              onChange={handleChange}
              rows={3}
              placeholder="Salin CP dari kurikulum..."
              className={`w-full px-4 py-2 rounded-lg bg-slate-700 border text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.capaianPembelajaran ? 'border-red-500 bg-red-900/10' : 'border-slate-600'}`}
              disabled={isLoading}
            />
            {errors.capaianPembelajaran && <p className="text-red-400 text-xs mt-1">{errors.capaianPembelajaran}</p>}
          </div>

          <div>
            <label htmlFor="tujuanPembelajaran" className="block text-sm font-medium text-slate-300 mb-1">
              Tujuan Pembelajaran (TP)
            </label>
            <textarea
              id="tujuanPembelajaran"
              name="tujuanPembelajaran"
              value={formData.tujuanPembelajaran}
              onChange={handleChange}
              rows={3}
              placeholder="Contoh: Peserta didik mampu mempraktikkan gerak dasar menendang bola..."
              className={`w-full px-4 py-2 rounded-lg bg-slate-700 border text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all ${errors.tujuanPembelajaran ? 'border-red-500 bg-red-900/10' : 'border-slate-600'}`}
              disabled={isLoading}
            />
            {errors.tujuanPembelajaran && <p className="text-red-400 text-xs mt-1">{errors.tujuanPembelajaran}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-lg font-bold text-white shadow-md transition-all flex justify-center items-center gap-2 ${
            isLoading 
              ? 'bg-slate-600 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98]'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sedang Membuat Rencana...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
              GENERATE OTOMATIS
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;