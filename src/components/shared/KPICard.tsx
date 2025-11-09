import { TrendingUp, TrendingDown, Minus, LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import React from 'react';
interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend?: "up" | "down" | "neutral";
  icon?: LucideIcon;
}

export function KPICard({ title, value, change, trend = "neutral", icon: Icon }: KPICardProps) {
  const trendColors = {
    up: "text-green-400",
    down: "text-red-400",
    neutral: "text-slate-400"
  };

  const trendIcons = {
    up: TrendingUp,
    down: TrendingDown,
    neutral: Minus
  };

  const TrendIcon = trendIcons[trend];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 hover:border-teal-500/50 transition-all hover:shadow-lg hover:shadow-teal-500/10"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-slate-400 text-sm mb-1">{title}</p>
          <h3 className="text-white text-3xl">{value}</h3>
        </div>
        {Icon && (
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-teal-400" />
          </div>
        )}
      </div>
      <div className={`flex items-center gap-2 ${trendColors[trend]}`}>
        <TrendIcon className="w-4 h-4" />
        <span className="text-sm">{change}</span>
      </div>
    </motion.div>
  );
}
