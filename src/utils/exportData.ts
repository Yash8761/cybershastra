// // src/utils/exportData.ts
// import * as XLSX from 'xlsx';

// export const exportToExcel = (data: any[], filename: string) => {
//   const ws = XLSX.utils.json_to_sheet(data);
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, 'Results');
//   XLSX.writeFile(wb, `${filename}.xlsx`);
// };

// // Update ResultTable component to include export button
// export const ResultTable: React.FC<ResultTableProps> = ({ data, columns, loading }) => {
//   const handleExport = () => {
//     exportToExcel(data, 'lookup-results');
//   };

//   return (
//     <div className="mt-6">
//       {/* ... existing table code ... */}
      
//       <div className="mt-4 flex justify-end">
//         <button
//           onClick={handleExport}
//           disabled={loading || data.length === 0}
//           className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50"
//         >
//           Export
//         </button>
//       </div>
//     </div>
//   );
// };