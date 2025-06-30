import React from "react";

export default function StatsCard({ 
  title, 
  value, 
  subtitle = "", 
  color = "primary",
  icon: IconComponent = null,
  valueSize = "text-3xl"
}) {
  // Mapping colors to Tailwind border and background-light equivalents
  const colorMap = {
    primary: { border: "border-blue-500", bg: "bg-blue-50" },
    success: { border: "border-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700" },
    warning: { border: "border-amber-500", bg: "bg-amber-50", text: "text-amber-700" },
    blue: { border: "border-blue-500", bg: "bg-blue-50", text: "text-blue-700" },
    teal: { border: "border-teal-500", bg: "bg-teal-50", text: "text-teal-700" },
    emerald: { border: "border-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700" },
    indigo: { border: "border-indigo-500", bg: "bg-indigo-50", text: "text-indigo-700" },
    cyan: { border: "border-cyan-500", bg: "bg-cyan-50", text: "text-cyan-700" },
    slate: { border: "border-slate-500", bg: "bg-slate-50", text: "text-slate-700" },
    sky: { border: "border-sky-700", bg: "bg-sky-100", text: "text-sky-700" },
    green: { border: "border-green-700", bg: "bg-green-100", text: "text-green-800" },
    yellow: { border: "border-yellow-700", bg: "bg-yellow-100", text: "text-yellow-600" },
    purple: { border: "border-purple-500", bg: "bg-purple-50", text: "text-purple-700" },
    red: { border: "border-red-500", bg: "bg-red-50", text: "text-red-700" },
  };

  const selected = colorMap[color] || colorMap.primary;

  return (
    <div
      className={`p-5 rounded-xl shadow-sm hover:shadow-md transition border-2 ${selected.border} ${selected.bg} ${selected.text}`}
    >
      <div className="font-semibold text-lg mb-2 flex items-center gap-2">
        {IconComponent && <IconComponent size={24} />}
        {title}
      </div>
      <div className={`${valueSize} font-bold`}>{value}</div>
      {subtitle && (
        <div className="text-sm mt-1 opacity-80">{subtitle}</div>
      )}
    </div>
  );
}
