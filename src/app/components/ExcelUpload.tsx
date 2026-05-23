import { useRef } from 'react';
import { motion } from 'motion/react';
import { Upload } from 'lucide-react';
import * as XLSX from 'xlsx';

interface ExcelUploadProps {
  onConfigChange: (config: { clock1: string; clock2: string; clock3: string }) => void;
}

export function ExcelUpload({ onConfigChange }: ExcelUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);

        if (jsonData.length > 0) {
          const row = jsonData[0] as any;
          const config = {
            clock1: row.clock1 || row.Clock1 || 'TH',
            clock2: row.clock2 || row.Clock2 || 'US',
            clock3: row.clock3 || row.Clock3 || 'UK',
          };

          // Validate country codes
          const validCodes = ['TH', 'US', 'UK', 'JP', 'CN', 'SG', 'AU', 'DE', 'FR', 'AE'];
          const isValid = [config.clock1, config.clock2, config.clock3].every(
            (code) => validCodes.includes(code.toUpperCase())
          );

          if (isValid) {
            onConfigChange({
              clock1: config.clock1.toUpperCase(),
              clock2: config.clock2.toUpperCase(),
              clock3: config.clock3.toUpperCase(),
            });
          } else {
            alert('Invalid country codes. Please use: TH, US, UK, JP, CN, SG, AU, DE, FR, AE');
          }
        }
      } catch (error) {
        console.error('Error reading Excel file:', error);
        alert('Error reading Excel file. Please make sure it has columns: clock1, clock2, clock3');
      }
    };

    reader.readAsArrayBuffer(file);
    // Reset input
    if (event.target) {
      event.target.value = '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="fixed top-6 right-6 z-50"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleFileUpload}
        className="hidden"
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 transition-all shadow-2xl group"
      >
        <Upload className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="font-medium">Upload Config</span>
      </motion.button>

      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
    </motion.div>
  );
}
