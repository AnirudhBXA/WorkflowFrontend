import { ShieldCheck, ArrowRight } from "lucide-react";

// Destructure props passed from the parent
export default function CertificationApprovalComponent({ items, setSelected }) {
  return (
    <div className="space-y-6 pt-6 border-t border-dashed border-gray-200">
      <div className="flex items-center gap-2 px-2">
        <ShieldCheck className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          Pending Verifications
        </h2>
      </div>

      <div className="bg-white rounded-4xl shadow-sm border border-indigo-50 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <th className="px-8 py-5 text-left">Employee</th>
              <th className="px-8 py-5 text-left">Certification</th>
              <th className="px-8 py-5 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="px-8 py-10 text-center text-gray-400 font-medium"
                >
                  No pending certifications to review.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr
                  key={item.id}
                  className="group hover:bg-indigo-50/30 transition-colors cursor-pointer"
                  onClick={() => setSelected(item)} // This updates parent state
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-700 font-black text-xs">
                        {item.employeeName.charAt(0)}
                      </div>
                      <span className="font-bold text-gray-900">
                        {item.employeeName}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-bold text-gray-700">
                    {item.name}
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="inline-flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase group-hover:gap-4 transition-all">
                      Review <ArrowRight size={14} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
