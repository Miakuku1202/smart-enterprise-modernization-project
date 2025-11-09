import { Leaf, Droplets, Zap, Recycle, TrendingDown, Award } from "lucide-react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Button } from "../ui/button";

const emissionsData = [
  { month: "Jan", co2: 450, target: 400 },
  { month: "Feb", co2: 420, target: 380 },
  { month: "Mar", co2: 390, target: 360 },
  { month: "Apr", co2: 370, target: 340 },
  { month: "May", co2: 350, target: 320 },
  { month: "Jun", co2: 320, target: 300 }
];

const resourceData = [
  { month: "Jan", water: 12000, energy: 8500, waste: 450 },
  { month: "Feb", water: 11500, energy: 8200, waste: 420 },
  { month: "Mar", water: 11000, energy: 7800, waste: 390 },
  { month: "Apr", water: 10500, energy: 7500, waste: 360 },
  { month: "May", water: 10000, energy: 7200, waste: 330 },
  { month: "Jun", water: 9500, energy: 6800, waste: 300 }
];

const sustainabilityScore = [
  { category: "Energy", score: 85 },
  { category: "Water", score: 78 },
  { category: "Waste", score: 82 },
  { category: "Emissions", score: 88 },
  { category: "Recycling", score: 90 }
];

export function SustainabilityPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white mb-2">Sustainability Dashboard</h1>
          <p className="text-slate-400">Environmental impact tracking and green initiatives</p>
        </div>
        <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white">
          <Award className="w-4 h-4 mr-2" />
          View Certifications
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-lg p-6 border border-green-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300 text-sm">CO₂ Reduction</span>
            <TrendingDown className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl text-white mb-1">-28.9%</div>
          <div className="text-xs text-green-400">320 tons saved this month</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg p-6 border border-blue-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300 text-sm">Water Conservation</span>
            <Droplets className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl text-white mb-1">9,500 L</div>
          <div className="text-xs text-blue-400">-20.8% from baseline</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-lg p-6 border border-yellow-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300 text-sm">Energy Efficiency</span>
            <Zap className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="text-2xl text-white mb-1">6,800 kWh</div>
          <div className="text-xs text-yellow-400">-20% usage reduction</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg p-6 border border-purple-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300 text-sm">Recycling Rate</span>
            <Recycle className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl text-white mb-1">90%</div>
          <div className="text-xs text-purple-400">+15% improvement</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CO2 Emissions Trend */}
        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
          <h3 className="text-white mb-4">CO₂ Emissions vs Target</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={emissionsData}>
              <defs>
                <linearGradient id="colorCO2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Legend />
              <Area type="monotone" dataKey="co2" stroke="#10b981" fillOpacity={1} fill="url(#colorCO2)" name="Actual CO₂" />
              <Line type="monotone" dataKey="target" stroke="#ef4444" strokeDasharray="5 5" name="Target" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sustainability Score Radar */}
        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
          <h3 className="text-white mb-4">Sustainability Score</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={sustainabilityScore}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="category" stroke="#94a3b8" />
              <PolarRadiusAxis stroke="#94a3b8" />
              <Radar name="Score" dataKey="score" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.6} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Resource Consumption */}
      <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
        <h3 className="text-white mb-4">Resource Consumption Trends</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={resourceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              labelStyle={{ color: '#94a3b8' }}
            />
            <Legend />
            <Bar dataKey="water" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Water (Liters)" />
            <Bar dataKey="energy" fill="#f59e0b" radius={[8, 8, 0, 0]} name="Energy (kWh)" />
            <Bar dataKey="waste" fill="#8b5cf6" radius={[8, 8, 0, 0]} name="Waste (kg)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Green Initiatives */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-green-500/50 transition-all cursor-pointer group">
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Leaf className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-white mb-2">Solar Energy</h3>
          <p className="text-slate-400 text-sm mb-4">45% of facility powered by renewable solar panels</p>
          <div className="text-2xl text-green-400">45%</div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-blue-500/50 transition-all cursor-pointer group">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Droplets className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-white mb-2">Water Recycling</h3>
          <p className="text-slate-400 text-sm mb-4">Industrial water recycling system operational</p>
          <div className="text-2xl text-blue-400">82%</div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-purple-500/50 transition-all cursor-pointer group">
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Recycle className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-white mb-2">Zero Waste Goal</h3>
          <p className="text-slate-400 text-sm mb-4">Progress towards zero landfill waste target</p>
          <div className="text-2xl text-purple-400">90%</div>
        </div>
      </div>
    </div>
  );
}
