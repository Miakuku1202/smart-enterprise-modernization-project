// Mock data for the enterprise platform

export const users = {
  executive: { email: "cxo@automotive.com", password: "demo123", role: "Executive" },
  factory: { email: "factory@automotive.com", password: "demo123", role: "Factory Manager" },
  supply: { email: "supply@automotive.com", password: "demo123", role: "Supply Chain Manager" },
  it: { email: "it@automotive.com", password: "demo123", role: "IT/DevOps Engineer" },
  ai: { email: "ai@automotive.com", password: "demo123", role: "AI Engineer" },
  partner: { email: "partner@automotive.com", password: "demo123", role: "Partner/Supplier" },
  support: { email: "support@automotive.com", password: "demo123", role: "Customer Support" }
};

export const executiveData = {
  kpis: [
    { title: "Production Efficiency", value: "92%", change: "+5%", trend: "up" },
    { title: "Revenue Growth", value: "+12%", change: "YoY", trend: "up" },
    { title: "Carbon Footprint Reduction", value: "1,200kg", change: "-15%", trend: "up" },
    { title: "Energy Efficiency", value: "87%", change: "Target: 90%", trend: "neutral" }
  ],
  revenueData: [
    { month: "Q1", revenue: 45000, target: 42000 },
    { month: "Q2", revenue: 52000, target: 50000 },
    { month: "Q3", revenue: 61000, target: 58000 },
    { month: "Q4", revenue: 68000, target: 65000 }
  ],
  departmentPerformance: [
    { department: "Production", score: 92 },
    { department: "Supply Chain", score: 88 },
    { department: "IT", score: 95 },
    { department: "R&D", score: 85 },
    { department: "Sales", score: 90 }
  ],
  energyUsage: [
    { name: "Manufacturing", value: 45 },
    { name: "Logistics", value: 25 },
    { name: "IT Infrastructure", value: 15 },
    { name: "Facilities", value: 15 }
  ]
};

export const factoryData = {
  machines: [
    { id: "M001", name: "Assembly Line 1", status: "operational", efficiency: 95 },
    { id: "M002", name: "Assembly Line 2", status: "operational", efficiency: 92 },
    { id: "M003", name: "Assembly Line 3", status: "maintenance", efficiency: 0 },
    { id: "M004", name: "Paint Station 1", status: "operational", efficiency: 88 },
    { id: "M005", name: "Paint Station 2", status: "warning", efficiency: 75 },
    { id: "M006", name: "Quality Control", status: "operational", efficiency: 98 }
  ],
  maintenanceAlerts: [
    { machine: "Assembly Line 3", type: "Scheduled", priority: "medium", date: "2025-11-08" },
    { machine: "Paint Station 2", type: "Predictive", priority: "high", date: "2025-11-07" },
    { machine: "Welding Robot 4", type: "Routine", priority: "low", date: "2025-11-10" }
  ],
  workforce: [
    { shift: "Morning", utilization: 95 },
    { shift: "Afternoon", utilization: 88 },
    { shift: "Night", utilization: 72 }
  ],
  production: [
    { week: "Week 1", units: 1200, target: 1150 },
    { week: "Week 2", units: 1350, target: 1200 },
    { week: "Week 3", units: 1280, target: 1200 },
    { week: "Week 4", units: 1420, target: 1300 }
  ]
};

export const supplyChainData = {
  kpis: [
    { title: "On-Time Delivery", value: "94%", change: "+3%", trend: "up" },
    { title: "Inventory Level", value: "3,200", change: "units", trend: "neutral" },
    { title: "Supplier Performance", value: "4.5/5", change: "avg", trend: "up" },
    { title: "Active Shipments", value: "47", change: "in transit", trend: "neutral" }
  ],
  suppliers: [
    { name: "TechParts GmbH", status: "Active", rating: 4.8, pending: 12, location: "Germany" },
    { name: "AutoComponents Inc", status: "Active", rating: 4.5, pending: 8, location: "USA" },
    { name: "GlobalSteel Co", status: "Warning", rating: 3.9, pending: 15, location: "China" },
    { name: "ElectroSys Ltd", status: "Active", rating: 4.7, pending: 5, location: "Japan" },
    { name: "PlasticWorks SA", status: "Active", rating: 4.6, pending: 9, location: "France" }
  ],
  inventoryForecast: [
    { month: "Nov", current: 3200, predicted: 3500, demand: 3400 },
    { month: "Dec", current: 3500, predicted: 4200, demand: 4100 },
    { month: "Jan", current: 4200, predicted: 3800, demand: 3900 },
    { month: "Feb", current: 3800, predicted: 4500, demand: 4400 }
  ],
  deliveryMetrics: [
    { category: "On Time", value: 78 },
    { category: "Delayed", value: 15 },
    { category: "In Transit", value: 7 }
  ]
};

export const itDevOpsData = {
  systemHealth: [
    { system: "API Gateway", uptime: 99.9, status: "healthy" },
    { system: "Cloud Infrastructure", uptime: 99.7, status: "healthy" },
    { system: "Database Cluster", uptime: 99.8, status: "healthy" },
    { system: "CI/CD Pipeline", uptime: 98.5, status: "warning" },
    { system: "Monitoring System", uptime: 99.9, status: "healthy" }
  ],
  apiMetrics: [
    { hour: "00:00", rest: 1200, graphql: 450 },
    { hour: "04:00", rest: 800, graphql: 300 },
    { hour: "08:00", rest: 3500, graphql: 1200 },
    { hour: "12:00", rest: 4200, graphql: 1800 },
    { hour: "16:00", rest: 3800, graphql: 1500 },
    { hour: "20:00", rest: 2100, graphql: 800 }
  ],
  errorLogs: [
    { timestamp: "2025-11-06 14:23", service: "Payment API", error: "Timeout Exception", severity: "high" },
    { timestamp: "2025-11-06 13:45", service: "Auth Service", error: "Rate Limit Exceeded", severity: "medium" },
    { timestamp: "2025-11-06 12:10", service: "Inventory DB", error: "Connection Pool Full", severity: "low" },
    { timestamp: "2025-11-06 11:30", service: "Notification Service", error: "Queue Overflow", severity: "medium" }
  ],
  cloudUsage: {
    compute: 67,
    storage: 82,
    network: 45,
    database: 73
  },
  containers: [
    { type: "Docker Instances", count: 45, status: "running" },
    { type: "K8s Pods", count: 120, status: "running" },
    { type: "Services", count: 28, status: "active" },
    { type: "Volumes", count: 56, status: "mounted" }
  ]
};

export const aiEngineerData = {
  models: [
    { name: "Production Forecast v3", accuracy: 94.5, status: "active", lastUpdated: "2025-11-05", retrain: false },
    { name: "Quality Detection AI", accuracy: 97.2, status: "active", lastUpdated: "2025-11-04", retrain: false },
    { name: "Maintenance Predictor", accuracy: 89.1, status: "warning", lastUpdated: "2025-10-28", retrain: true },
    { name: "Demand Forecasting", accuracy: 91.8, status: "active", lastUpdated: "2025-11-03", retrain: false },
    { name: "Energy Optimizer", accuracy: 88.5, status: "active", lastUpdated: "2025-11-01", retrain: false }
  ],

  predictions: [
    { week: "Week 1", failures: 2, confidence: 85 },
    { week: "Week 2", failures: 1, confidence: 92 },
    { week: "Week 3", failures: 3, confidence: 78 },
    { week: "Week 4", failures: 1, confidence: 88 }
  ],

  demandForecast: [
    { product: "Sedan Model A", predicted: 1200, confidence: 94 },
    { product: "SUV Model B", predicted: 850, confidence: 89 },
    { product: "Electric Model C", predicted: 650, confidence: 91 },
    { product: "Truck Model D", predicted: 420, confidence: 86 }
  ],

  dataPipeline: [
    { stage: "Data Collection", status: "healthy", throughput: "15.2K/min" },
    { stage: "Data Processing", status: "healthy", throughput: "12.8K/min" },
    { stage: "Feature Engineering", status: "warning", throughput: "8.5K/min" },
    { stage: "Model Training", status: "healthy", throughput: "2.1K/min" },
    { stage: "Inference", status: "healthy", throughput: "18.9K/min" }
  ],

  // ✅ Add this new section below — required for the performance chart
  modelPerformance: [
    { month: "Jan", accuracy: 88, precision: 82, recall: 80 },
    { month: "Feb", accuracy: 90, precision: 85, recall: 83 },
    { month: "Mar", accuracy: 91, precision: 86, recall: 85 },
    { month: "Apr", accuracy: 92, precision: 87, recall: 86 },
    { month: "May", accuracy: 93, precision: 89, recall: 88 },
    { month: "Jun", accuracy: 94, precision: 90, recall: 89 },
    { month: "Jul", accuracy: 95, precision: 91, recall: 90 },
    { month: "Aug", accuracy: 94, precision: 90, recall: 89 },
    { month: "Sep", accuracy: 96, precision: 92, recall: 91 },
    { month: "Oct", accuracy: 95, precision: 91, recall: 90 },
    { month: "Nov", accuracy: 97, precision: 93, recall: 92 },
    { month: "Dec", accuracy: 98, precision: 94, recall: 93 }
  ]
};


export const partnerSupplierData = {
  orders: [
    { id: "ORD-2845", product: "Engine Components", quantity: 500, status: "delivered", date: "2025-11-05" },
    { id: "ORD-2846", product: "Brake Systems", quantity: 300, status: "in-transit", date: "2025-11-06" },
    { id: "ORD-2847", product: "Electrical Wiring", quantity: 1000, status: "pending", date: "2025-11-07" },
    { id: "ORD-2848", product: "Suspension Parts", quantity: 200, status: "delivered", date: "2025-11-04" },
    { id: "ORD-2849", product: "Interior Trim", quantity: 450, status: "cancelled", date: "2025-11-03" }
  ],
  performance: [
    { month: "Jul", delivered: 95, delayed: 5 },
    { month: "Aug", delivered: 92, delayed: 8 },
    { month: "Sep", delivered: 97, delayed: 3 },
    { month: "Oct", delivered: 94, delayed: 6 },
    { month: "Nov", delivered: 96, delayed: 4 }
  ],
  apiIntegrations: [
    { name: "Inventory Sync API", status: "connected", lastSync: "2 mins ago" },
    { name: "Order Management API", status: "connected", lastSync: "5 mins ago" },
    { name: "Shipping Tracker API", status: "error", lastSync: "45 mins ago" },
    { name: "Invoice API", status: "connected", lastSync: "1 min ago" }
  ],
  communications: [
    { from: "Procurement Team", message: "New order batch approved - ORD-2847", time: "10 mins ago" },
    { from: "Quality Assurance", message: "Inspection completed for shipment #447", time: "1 hour ago" },
    { from: "Logistics", message: "Delivery scheduled for Nov 8th", time: "2 hours ago" }
  ]
};

export const customerSupportData = {
  tickets: [
    { id: "TKT-1024", customer: "AutoMax Dealership", issue: "Software Integration", status: "open", priority: "high", created: "2025-11-06" },
    { id: "TKT-1023", customer: "DriveRight Motors", issue: "Billing Query", status: "in-progress", priority: "medium", created: "2025-11-05" },
    { id: "TKT-1022", customer: "SpeedTech Solutions", issue: "API Access", status: "resolved", priority: "low", created: "2025-11-04" },
    { id: "TKT-1021", customer: "GlobalAuto Inc", issue: "Feature Request", status: "in-progress", priority: "medium", created: "2025-11-03" },
    { id: "TKT-1020", customer: "EliteMotors Group", issue: "Technical Support", status: "resolved", priority: "high", created: "2025-11-02" }
  ],
  feedbackRatings: [
    { rating: "5 Stars", count: 145 },
    { rating: "4 Stars", count: 89 },
    { rating: "3 Stars", count: 34 },
    { rating: "2 Stars", count: 12 },
    { rating: "1 Star", count: 8 }
  ],
  responseTime: [
    { category: "< 1 hour", percentage: 68 },
    { category: "1-4 hours", percentage: 22 },
    { category: "4-24 hours", percentage: 8 },
    { category: "> 24 hours", percentage: 2 }
  ],
  recentActivity: [
    { action: "Ticket TKT-1024 assigned to John Smith", time: "5 mins ago" },
    { action: "Customer feedback received: 4.5⭐ for TKT-1020", time: "15 mins ago" },
    { action: "Ticket TKT-1022 resolved and closed", time: "1 hour ago" },
    { action: "New escalation for TKT-1024", time: "2 hours ago" }
  ]
};

export const sustainabilityData = {
  carbonFootprint: [
    { month: "Jul", emissions: 2400, savings: 1100 },
    { month: "Aug", emissions: 2200, savings: 1200 },
    { month: "Sep", emissions: 2100, savings: 1250 },
    { month: "Oct", emissions: 1900, savings: 1300 },
    { month: "Nov", emissions: 1800, savings: 1400 }
  ],
  powerUsage: {
    current: 87,
    target: 90,
    trend: "improving"
  },
  recommendations: [
    { title: "Optimize HVAC Systems", impact: "High", savings: "12% energy" },
    { title: "Switch to LED Lighting", impact: "Medium", savings: "8% energy" },
    { title: "Upgrade Server Cooling", impact: "High", savings: "15% energy" },
    { title: "Implement Smart Scheduling", impact: "Medium", savings: "10% energy" }
  ]
};
