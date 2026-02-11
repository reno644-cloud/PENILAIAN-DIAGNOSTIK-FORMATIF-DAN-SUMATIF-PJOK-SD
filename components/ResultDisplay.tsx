import React, { useRef, useState } from 'react';

interface ResultDisplayProps {
  htmlContent: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ htmlContent }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const handleCopyAndOpen = async () => {
    if (!contentRef.current) return;

    try {
      const html = contentRef.current.innerHTML;
      const text = contentRef.current.innerText;

      // Create rich text blob for clipboard
      const blobHtml = new Blob([html], { type: 'text/html' });
      const blobText = new Blob([text], { type: 'text/plain' });

      const data = [new ClipboardItem({ 'text/html': blobHtml, 'text/plain': blobText })];

      await navigator.clipboard.write(data);
      setCopyStatus('copied');
      
      // Open Google Docs new document
      setTimeout(() => {
        window.open('https://docs.new', '_blank');
        setCopyStatus('idle');
      }, 1500);

    } catch (err) {
      console.error('Failed to copy: ', err);
      setCopyStatus('error');
    }
  };

  const handleDownloadWord = () => {
    // Wrap the content in a standard HTML structure compatible with Word
    const preHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
       <meta charset="utf-8">
       <title>Instrumen Penilaian PJOK</title>
       <style>
          body { font-family: 'Times New Roman', serif; font-size: 12pt; }
          table { border-collapse: collapse; width: 100%; }
          td, th { border: 1px solid black; padding: 5px; }
       </style>
    </head><body>`;
    const postHtml = "</body></html>";
    
    // Combine content
    const fullHtml = preHtml + htmlContent + postHtml;

    // Create a Blob with the correct MIME type for Word
    const blob = new Blob(['\ufeff', fullHtml], {
        type: 'application/msword'
    });

    // Create a download link programmatically
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Instrumen_Penilaian_PJOK_${new Date().toLocaleDateString('id-ID').replace(/\//g, '-')}.doc`; // Filename format
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 flex flex-col h-full">
      <div className="p-4 border-b border-slate-700 flex flex-col sm:flex-row justify-between items-center bg-slate-800 rounded-t-xl gap-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>
          Hasil Rencana Penilaian
        </h2>
        
        <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadWord}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm bg-blue-600 border border-blue-500 text-white hover:bg-blue-500 hover:border-blue-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              Download Word
            </button>

            <button
              onClick={handleCopyAndOpen}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                copyStatus === 'copied' 
                  ? 'bg-green-900/50 text-green-300 border border-green-700' 
                  : 'bg-slate-700 border border-slate-600 text-slate-200 hover:bg-slate-600 hover:border-slate-500'
              }`}
            >
              {copyStatus === 'copied' ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Disalin!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  Salin Teks
                </>
              )}
            </button>
        </div>
      </div>

      <div className="p-6 overflow-y-auto max-h-[800px] bg-slate-800 rounded-b-xl">
        {/* Render HTML content safely - KEEP WHITE BG for document accuracy */}
        <div 
          ref={contentRef}
          className="document-preview text-slate-900 leading-relaxed bg-white p-8 shadow-sm min-h-[500px]"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
};

export default ResultDisplay;