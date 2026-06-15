import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Package, Users, DollarSign, TrendingUp, Search, Bell, Settings } from "lucide-react";
import { Link } from "react-router";

const salesData = [
  { name: "Mon", sales: 4000 },
  { name: "Tue", sales: 3000 },
  { name: "Wed", sales: 2000 },
  { name: "Thu", sales: 2780 },
  { name: "Fri", sales: 1890 },
  { name: "Sat", sales: 2390 },
  { name: "Sun", sales: 3490 },
];

const revenueData = [
  { month: "Jan", revenue: 40000 },
  { month: "Feb", revenue: 30000 },
  { month: "Mar", revenue: 50000 },
  { month: "Apr", revenue: 45000 },
  { month: "May", revenue: 60000 },
  { month: "Jun", revenue: 55000 },
];

export function Admin() {
  return (
    <div className="flex h-screen bg-background font-sans text-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link to="/" className="font-heading text-xl font-bold tracking-wide">VYAA <span className="text-xs font-sans text-muted-foreground ml-2">ADMIN</span></Link>
        </div>
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-1 px-4">
            <button className="w-full flex items-center space-x-3 px-4 py-2.5 bg-muted text-foreground rounded-lg text-sm font-medium transition-colors">
              <TrendingUp className="w-4 h-4" /> <span>Dashboard</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-muted-foreground hover:bg-muted/50 hover:text-foreground rounded-lg text-sm font-medium transition-colors">
              <Package className="w-4 h-4" /> <span>Products</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-muted-foreground hover:bg-muted/50 hover:text-foreground rounded-lg text-sm font-medium transition-colors">
              <DollarSign className="w-4 h-4" /> <span>Orders</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-muted-foreground hover:bg-muted/50 hover:text-foreground rounded-lg text-sm font-medium transition-colors">
              <Users className="w-4 h-4" /> <span>Customers</span>
            </button>
          </nav>
        </div>
        <div className="p-4 border-t border-border">
          <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-muted-foreground hover:bg-muted/50 hover:text-foreground rounded-lg text-sm font-medium transition-colors">
            <Settings className="w-4 h-4" /> <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center text-sm text-muted-foreground">
            Dashboard Overview
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 bg-muted rounded-full text-sm border-none focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <button className="p-2 text-muted-foreground hover:text-foreground relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <h1 className="text-2xl font-semibold mb-8">Overview</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                  <h3 className="text-2xl font-bold">₹1,245,600</h3>
                </div>
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" /> +12.5% from last month
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Orders</p>
                  <h3 className="text-2xl font-bold">845</h3>
                </div>
                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
              </div>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" /> +8.2% from last month
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Customers</p>
                  <h3 className="text-2xl font-bold">3,204</h3>
                </div>
                <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" /> +4.1% from last month
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Conversion Rate</p>
                  <h3 className="text-2xl font-bold">3.2%</h3>
                </div>
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <p className="text-xs text-red-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1 rotate-180" /> -1.2% from last month
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-6">Revenue Overview</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: 'var(--muted-foreground)', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--muted-foreground)', fontSize: 12}} dx={-10} tickFormatter={(val) => `₹${val/1000}k`} />
                    <Tooltip cursor={{stroke: 'var(--border)'}} contentStyle={{borderRadius: '8px', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Line type="monotone" dataKey="revenue" stroke="var(--foreground)" strokeWidth={2} dot={{r: 4, fill: 'var(--foreground)'}} activeDot={{r: 6}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-6">Weekly Sales</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--muted-foreground)', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--muted-foreground)', fontSize: 12}} dx={-10} />
                    <Tooltip cursor={{fill: 'var(--muted)'}} contentStyle={{borderRadius: '8px', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Bar dataKey="sales" fill="var(--accent)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h3 className="text-lg font-medium">Recent Orders</h3>
              <button className="text-sm text-accent hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground text-xs uppercase">
                  <tr>
                    <th className="px-6 py-4 font-medium">Order ID</th>
                    <th className="px-6 py-4 font-medium">Customer</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Amount</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { id: "#ORD-7352", name: "Priya Sharma", date: "Today, 10:24 AM", amount: "₹17,980", status: "Processing" },
                    { id: "#ORD-7351", name: "Riya Patel", date: "Today, 09:12 AM", amount: "₹8,990", status: "Shipped" },
                    { id: "#ORD-7350", name: "Neha Singh", date: "Yesterday, 04:30 PM", amount: "₹24,500", status: "Delivered" },
                    { id: "#ORD-7349", name: "Ananya Desai", date: "Yesterday, 02:15 PM", amount: "₹6,200", status: "Delivered" },
                  ].map((order, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-medium">{order.id}</td>
                      <td className="px-6 py-4">{order.name}</td>
                      <td className="px-6 py-4 text-muted-foreground">{order.date}</td>
                      <td className="px-6 py-4 font-medium">{order.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
