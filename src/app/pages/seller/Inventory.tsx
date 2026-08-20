import { useState } from 'react';
import { Badge } from '../../components/Badge';
import { AlertCircle, Package, BarChart3, Edit, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const inventoryItems = [
  { id: '1', product: 'Minimalist Ceramic Vase', sku: 'HOME-001', stock: 12, sold: 42, price: 89, status: 'In Stock', image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=80&h=80&fit=crop' },
  { id: '2', product: 'Stoneware Dinner Set', sku: 'HOME-009', stock: 6, sold: 18, price: 320, status: 'In Stock', image: 'https://images.unsplash.com/photo-1603199506016-5a1f76dc2f18?w=80&h=80&fit=crop' },
  { id: '3', product: 'Sculptural Table Lamp', sku: 'HOME-007', stock: 2, sold: 12, price: 220, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=80&h=80&fit=crop' },
  { id: '4', product: 'Obsidian Bookend Pair', sku: 'OBJ-014', stock: 0, sold: 9, price: 138, status: 'Out of Stock', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=80&h=80&fit=crop' },
];

const chartData = inventoryItems.map(i => ({
  name: i.product.split(' ').slice(0, 2).join(' '),
  stock: i.stock,
  sold: i.sold,
}));

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-culte-navy text-white px-4 py-3 text-xs space-y-1">
        <p className="text-culte-orange mb-1 truncate max-w-[160px]">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name}>{entry.name.toUpperCase()}: {entry.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

export const Inventory = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [stockValues, setStockValues] = useState<Record<string, string>>({});

  const lowStockCount = inventoryItems.filter(i => i.stock <= 5 && i.stock > 0).length;
  const outOfStockCount = inventoryItems.filter(i => i.stock === 0).length;
  const totalValue = inventoryItems.reduce((s, i) => s + i.stock * i.price, 0);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <p className="text-xs text-culte-orange tracking-[0.3em] mb-2">STOCK</p>
          <h1 className="font-cormorant text-4xl text-culte-navy">INVENTORY</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="border-2 border-culte-navy/10 px-5 py-2.5 text-center">
            <p className="font-cormorant text-xl text-culte-navy">£${totalValue.toLocaleString()}</p>
            <p className="text-xs text-culte-navy/30 tracking-widest mt-0.5">STOCK VALUE</p>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {(lowStockCount > 0 || outOfStockCount > 0) && (
        <div className="space-y-3 mb-8">
          {outOfStockCount > 0 && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">
                <strong>{outOfStockCount} product{outOfStockCount > 1 ? 's' : ''}</strong> out of stock — update inventory to avoid lost sales.
              </p>
            </div>
          )}
          {lowStockCount > 0 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-700">
                <strong>{lowStockCount} product{lowStockCount > 1 ? 's' : ''}</strong> running low — consider restocking.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Stock Chart */}
      <div className="border-2 border-culte-navy/10 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-culte-navy" />
            <h2 className="text-sm text-culte-navy tracking-widest">STOCK VS SOLD</h2>
          </div>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(24,30,81,0.05)" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fontFamily: 'Inter', fill: '#181E51', opacity: 0.5 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#181E51', opacity: 0.5 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="stock" name="In Stock" fill="#C2DFED" radius={[2,2,0,0]} barSize={24} />
              <Bar dataKey="sold" name="Units Sold" fill="#E17544" radius={[2,2,0,0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-culte-navy/10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-culte-light-blue border border-culte-navy/20" />
            <span className="text-xs text-culte-navy/50 tracking-widest">IN STOCK</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-culte-orange" />
            <span className="text-xs text-culte-navy/50 tracking-widest">UNITS SOLD</span>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="border-2 border-culte-navy/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-culte-light-blue border-b border-culte-navy/10">
              <th className="text-left px-5 py-3.5 text-xs text-culte-navy/50 tracking-widest">PRODUCT</th>
              <th className="text-left px-5 py-3.5 text-xs text-culte-navy/50 tracking-widest hidden md:table-cell">SKU</th>
              <th className="text-left px-5 py-3.5 text-xs text-culte-navy/50 tracking-widest">STOCK</th>
              <th className="text-left px-5 py-3.5 text-xs text-culte-navy/50 tracking-widest hidden sm:table-cell">SOLD</th>
              <th className="text-left px-5 py-3.5 text-xs text-culte-navy/50 tracking-widest">STATUS</th>
              <th className="text-right px-5 py-3.5 text-xs text-culte-navy/50 tracking-widest">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map((item, i) => (
              <tr key={item.id} className={`${i < inventoryItems.length - 1 ? 'border-b border-culte-navy/5' : ''} hover:bg-culte-light-blue/20 transition-colors`}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden bg-culte-light-blue flex-shrink-0">
                      <img src={item.image} alt={item.product} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-sm text-culte-black">{item.product}</p>
                  </div>
                </td>
                <td className="px-5 py-4 text-xs text-culte-navy/40 hidden md:table-cell">{item.sku}</td>
                <td className="px-5 py-4">
                  {editingId === item.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={stockValues[item.id] ?? item.stock}
                        onChange={e => setStockValues(prev => ({ ...prev, [item.id]: e.target.value }))}
                        className="w-16 border-2 border-culte-orange px-2 py-1 text-sm focus:outline-none"
                        autoFocus
                      />
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-xs text-culte-orange"
                      >
                        SAVE
                      </button>
                    </div>
                  ) : (
                    <span className={`text-sm ${item.stock === 0 ? 'text-red-500' : item.stock <= 5 ? 'text-yellow-600' : 'text-culte-navy'}`}>
                      {stockValues[item.id] ?? item.stock}
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 text-sm text-culte-black/50 hidden sm:table-cell">{item.sold} units</td>
                <td className="px-5 py-4">
                  <Badge variant={
                    item.status === 'In Stock' ? 'blue' :
                    item.status === 'Low Stock' ? 'orange' : 'navy'
                  }>
                    {item.status.toUpperCase()}
                  </Badge>
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    onClick={() => setEditingId(editingId === item.id ? null : item.id)}
                    className="flex items-center gap-1 text-xs text-culte-orange hover:text-culte-navy transition-colors ml-auto"
                  >
                    <Edit className="w-3 h-3" /> UPDATE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};