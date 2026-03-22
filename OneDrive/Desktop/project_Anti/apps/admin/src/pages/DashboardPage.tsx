import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, ShoppingBag, Users as UsersIcon } from 'lucide-react';
import { getOrders, getUsers } from '../services/api';

export function DashboardPage() {
    const [stats, setStats] = useState({
        revenue: 0,
        sales: 0,
        users: 0,
        conversionRate: '3.24%' // Mocked for now until we have analytics tracking
    });
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [chartData, setChartData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [ordersRes, usersRes] = await Promise.all([getOrders(), getUsers()]);
                const orders: any[] = ordersRes.data;
                const users: any[] = usersRes.data;

                // Calculate Stats
                const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
                const totalSales = orders.length;
                const totalUsers = users.length;

                setStats({
                    revenue: totalRevenue,
                    sales: totalSales,
                    users: totalUsers,
                    conversionRate: '3.24%'
                });

                // Get 5 most recent orders for summary
                setRecentOrders(orders.slice(0, 5));

                // Group by month for chart (Very simplified logic, assuming orders have 'createdAt')
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const revenueByMonth = orders.reduce((acc: any, order) => {
                    const date = new Date(order.createdAt);
                    const monthName = months[date.getMonth()];
                    acc[monthName] = (acc[monthName] || 0) + order.total;
                    return acc;
                }, {});

                // Default empty months if no data
                const finalChartData = months.map(m => ({
                    name: m,
                    revenue: revenueByMonth[m] || 0
                })).filter(d => d.revenue > 0); // Only show months with revenue

                setChartData(finalChartData.length > 0 ? finalChartData : [{ name: 'Current', revenue: totalRevenue }]);

            } catch (error) {
                console.error('Failed to fetch dashboard data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const statCards = [
        { title: 'Total Revenue', value: `$${stats.revenue.toFixed(2)}`, icon: DollarSign, trend: 'All time' },
        { title: 'Sales', value: stats.sales, icon: ShoppingBag, trend: 'All time' },
        { title: 'Active Users', value: stats.users, icon: UsersIcon, trend: 'All time' },
        { title: 'Conversion Rate', value: stats.conversionRate, icon: TrendingUp, trend: 'Simulated' },
    ];

    if (loading) return <div className="text-gray-400">Loading dashboard...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-gray-400">{stat.title}</h3>
                                <Icon className="w-5 h-5 text-gray-500" />
                            </div>
                            <div className="text-2xl font-bold mb-1">{stat.value}</div>
                            <p className="text-xs text-gray-500">{stat.trend}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <div className="col-span-1 lg:col-span-2 xl:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-6 h-[400px]">
                    <h3 className="text-lg font-medium mb-6">Revenue Overview</h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                            <XAxis dataKey="name" stroke="#9CA3AF" axisLine={false} tickLine={false} />
                            <YAxis stroke="#9CA3AF" axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Bar dataKey="revenue" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="col-span-1 bg-gray-900 border border-gray-800 rounded-xl p-6 overflow-hidden">
                    <h3 className="text-lg font-medium mb-6">Recent Sales</h3>
                    <div className="space-y-6">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                                        <ShoppingBag className="w-5 h-5 text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Order #{order.id.slice(-4)}</p>
                                        <p className="text-xs text-gray-500">{order.status}</p>
                                    </div>
                                </div>
                                <div className="font-medium text-green-400">+${order.total.toFixed(2)}</div>
                            </div>
                        ))}
                        {recentOrders.length === 0 && (
                            <div className="text-gray-500 text-sm">No sales yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
