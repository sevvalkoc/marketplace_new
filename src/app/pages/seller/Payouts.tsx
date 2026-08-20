import { DollarSign, TrendingUp, Download, ArrowUpRight } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { mockPayoutData } from '../../data/mockData';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-culte-navy text-white px-4 py-3 text-xs space-y-1">
        <p className="text-culte-orange mb-1">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name}>{entry.name.toUpperCase()}: £{entry.value.toLocaleString()}</p>
        ))}
      </div>
    );
  }
  return null;
};

export const Payouts = () => {
  const payouts = [
    { id: 'PAY-006', date: 'Apr 1, 2026', amount: 7436.00, status: 'Paid', orders: 64 },
    { id: 'PAY-005', date: 'Mar 1, 2026', amount: 6336.00, status: 'Paid', orders: 58 },
    { id: 'PAY-004', date: 'Feb 1, 2026', amount: 4488.00, status: 'Paid', orders: 39 },
    { id: 'PAY-003', date: 'Jan 1, 2026', amount: 3432.00, status: 'Paid', orders: 28 },
    { id: 'PAY-002', date: 'Dec 1, 2025', amount: 5984.00, status: 'Paid', orders: 52 },
    { id: 'PAY-001', date: 'Nov 1, 2025', amount: 3696.00, status: 'Paid', orders: 31 },
  ];

  const pendingBalance = 2840.00;
  const totalEarnings = 31372.00;
  const commissionRate = 0.12;
  const nextPayoutDate = 'May 1, 2026';

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <p className="text-xs text-culte-orange tracking-[0.3em] mb-2">FINANCES</p>
          <h1 className="font-cormorant text-4xl text-culte-navy">PAYOUTS</h1>
        </div>
        <button className="flex items-center gap-2 border-2 border-culte-navy/15 px-5 py-2.5 text-xs text-culte-navy hover:border-culte-navy transition-colors">
          <Download className="w-3.5 h-3.5" /> EXPORT STATEMENT
        </button>
      </div>

      {/* Balance Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-culte-orange text-white p-8">
          <DollarSign className="w-7 h-7 mb-4 opacity-80" />
          <p className="text-xs tracking-widest opacity-70 mb-2">PENDING BALANCE</p>
          <p className="font-cormorant text-4xl">£${pendingBalance.toFixed(2)}</p>
          <p className="text-sm opacity-70 mt-2 flex items-center gap-1">
            <span>Next payout: {nextPayoutDate}</span>
          </p>
        </div>
        <div className="bg-culte-navy text-white p-8">
          <TrendingUp className="w-7 h-7 mb-4 opacity-80" />
          <p className="text-xs tracking-widest opacity-70 mb-2">TOTAL EARNINGS</p>
          <p className="font-cormorant text-4xl">£${totalEarnings.toLocaleString()}</p>
          <p className="text-sm opacity-50 mt-2">All time since joining</p>
        </div>
        <div className="bg-culte-light-blue p-8">
          <p className="text-xs text-culte-navy/50 tracking-widest mb-2">COMMISSION RATE</p>
          <p className="font-cormorant text-4xl text-culte-navy">{(commissionRate * 100).toFixed(0)}%</p>
          <p className="text-sm text-culte-black/60 mt-2">Studio Marche marketplace fee</p>
          <div className="mt-3 flex items-center gap-1 text-xs text-culte-orange">
            <ArrowUpRight className="w-3 h-3" /> You keep 88%
          </div>
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="border-2 border-culte-navy/10 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-cormorant text-lg text-culte-navy">EARNINGS OVERVIEW</h2>
          <p className="text-xs text-culte-navy/40 tracking-widest">NOV 2025 – APR 2026</p>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockPayoutData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="payoutGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E17544" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#E17544" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="commGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C2DFED" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#C2DFED" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(24,30,81,0.06)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: 'Inter', fill: '#181E51', opacity: 0.5 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#181E51', opacity: 0.5 }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="payout" name="Your Payout" stroke="#E17544" strokeWidth={2.5} fill="url(#payoutGradient)" />
              <Area type="monotone" dataKey="commission" name="Commission" stroke="#C2DFED" strokeWidth={2} fill="url(#commGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-culte-navy/10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-culte-orange" />
            <span className="text-xs text-culte-navy/50 tracking-widest">YOUR PAYOUT</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-culte-light-blue border border-culte-navy/20" />
            <span className="text-xs text-culte-navy/50 tracking-widest">COMMISSION</span>
          </div>
        </div>
      </div>

      {/* Payout History */}
      <section>
        <h2 className="font-cormorant text-lg text-culte-navy mb-5">PAYOUT HISTORY</h2>
        <div className="border-2 border-culte-navy/10 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-culte-light-blue border-b border-culte-navy/10">
                <th className="text-left px-6 py-3.5 text-xs text-culte-navy/50 tracking-widest">PAYOUT ID</th>
                <th className="text-left px-6 py-3.5 text-xs text-culte-navy/50 tracking-widest">DATE</th>
                <th className="text-left px-6 py-3.5 text-xs text-culte-navy/50 tracking-widest hidden md:table-cell">ORDERS</th>
                <th className="text-left px-6 py-3.5 text-xs text-culte-navy/50 tracking-widest">AMOUNT</th>
                <th className="text-left px-6 py-3.5 text-xs text-culte-navy/50 tracking-widest">STATUS</th>
                <th className="text-right px-6 py-3.5 text-xs text-culte-navy/50 tracking-widest">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((payout, i) => (
                <tr key={payout.id} className={`${i < payouts.length - 1 ? 'border-b border-culte-navy/5' : ''} hover:bg-culte-light-blue/30 transition-colors`}>
                  <td className="px-6 py-4 text-xs text-culte-navy">{payout.id}</td>
                  <td className="px-6 py-4 text-sm text-culte-black">{payout.date}</td>
                  <td className="px-6 py-4 text-sm text-culte-black/50 hidden md:table-cell">{payout.orders} orders</td>
                  <td className="px-6 py-4 text-sm text-culte-navy">£${payout.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 text-xs bg-green-50 text-green-700">PAID</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs text-culte-orange hover:text-culte-navy transition-colors tracking-widest flex items-center gap-1 ml-auto">
                      <Download className="w-3 h-3" /> RECEIPT
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};