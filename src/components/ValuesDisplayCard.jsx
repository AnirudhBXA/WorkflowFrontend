// export default function ValuesDisplayCard({ data }) {
//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-200 dark:border-gray-700 flex justify-between items-end">
//       <div>
//         <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
//           {data.context}
//         </p>
//         <div className="flex items-baseline gap-2">
//           <span className="text-3xl font-bold text-gray-900 dark:text-white">
//             {data.value}
//           </span>
//           <span className="text-sm text-gray-400">{data.units}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function ValuesDisplayCard({ data }) {
  return (
    <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 flex justify-between items-end">
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
          {data.context}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-white">
            {data.value}
          </span>
          <span className="text-sm text-slate-400">{data.units}</span>
        </div>
      </div>
    </div>
  );
}
