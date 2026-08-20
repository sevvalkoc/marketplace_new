import { useState } from 'react';
import { Link } from 'react-router';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';

const initialProducts = [
  { id: '1', name: 'Minimalist Ceramic Vase', sku: 'HOME-001', price: 89.00, stock: 12, sold: 42, status: 'Published', image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=100&h=100&fit=crop', category: 'Home' },
  { id: '9', name: 'Stoneware Dinner Set', sku: 'HOME-009', price: 320.00, stock: 6, sold: 18, status: 'Published', image: 'https://images.unsplash.com/photo-1603199506016-5a1f76dc2f18?w=100&h=100&fit=crop', category: 'Home' },
  { id: '7', name: 'Sculptural Table Lamp', sku: 'HOME-007', price: 220.00, stock: 2, sold: 12, status: 'Published', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=100&h=100&fit=crop', category: 'Home' },
  { id: '14', name: 'Obsidian Bookend Pair', sku: 'OBJ-014', price: 138.00, stock: 9, sold: 9, status: 'Published', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop', category: 'Objects' },
  { id: 'draft-1', name: 'New Glaze Experiment', sku: 'HOME-NEW', price: 95.00, stock: 0, sold: 0, status: 'Draft', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop', category: 'Home' },
];

export const ProductList = () => {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Published' | 'Draft'>('All');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = products.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setDeleteId(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <p className="font-valibuk text-xs text-culte-orange tracking-[0.3em] mb-2">CATALOGUE</p>
          <h1 className="font-valibuk text-4xl text-culte-navy">PRODUCTS</h1>
          <p className="text-culte-black/50 text-sm mt-1">{products.filter(p => p.status === 'Published').length} published · {products.filter(p => p.status === 'Draft').length} drafts</p>
        </div>
        <Link to="/seller/add-product">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> ADD PRODUCT
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-culte-navy/30" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full border-2 border-culte-navy/15 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-culte-navy transition-colors"
          />
        </div>
        {/* Status filter */}
        <div className="flex border-2 border-culte-navy/15">
          {(['All', 'Published', 'Draft'] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2.5 font-valibuk text-xs tracking-widest transition-colors ${
                statusFilter === s ? 'bg-culte-navy text-white' : 'text-culte-navy/50 hover:text-culte-navy'
              }`}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="border-2 border-culte-navy/10 overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="bg-culte-light-blue border-b border-culte-navy/10">
              <th className="text-left px-5 py-3.5 font-valibuk text-xs text-culte-navy/50 tracking-widest">PRODUCT</th>
              <th className="text-left px-5 py-3.5 font-valibuk text-xs text-culte-navy/50 tracking-widest hidden lg:table-cell">SKU</th>
              <th className="text-left px-5 py-3.5 font-valibuk text-xs text-culte-navy/50 tracking-widest">PRICE</th>
              <th className="text-left px-5 py-3.5 font-valibuk text-xs text-culte-navy/50 tracking-widest">STOCK</th>
              <th className="text-left px-5 py-3.5 font-valibuk text-xs text-culte-navy/50 tracking-widest hidden md:table-cell">SOLD</th>
              <th className="text-left px-5 py-3.5 font-valibuk text-xs text-culte-navy/50 tracking-widest">STATUS</th>
              <th className="text-right px-5 py-3.5 font-valibuk text-xs text-culte-navy/50 tracking-widest">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product, i) => (
              <tr key={product.id} className={`${i < filtered.length - 1 ? 'border-b border-culte-navy/5' : ''} hover:bg-culte-light-blue/20 transition-colors`}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden bg-culte-light-blue flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm text-culte-black">{product.name}</p>
                      <p className="font-valibuk text-xs text-culte-navy/30 mt-0.5">{product.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 font-valibuk text-xs text-culte-navy/40 hidden lg:table-cell">{product.sku}</td>
                <td className="px-5 py-4 font-valibuk text-sm text-culte-navy">£${product.price.toFixed(2)}</td>
                <td className="px-5 py-4">
                  <span className={`text-sm font-valibuk ${product.stock === 0 ? 'text-red-500' : product.stock <= 5 ? 'text-yellow-600' : 'text-culte-black'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-culte-black/50 hidden md:table-cell">{product.sold}</td>
                <td className="px-5 py-4">
                  <Badge variant={product.status === 'Published' ? 'blue' : 'default'}>
                    {product.status.toUpperCase()}
                  </Badge>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      to={`/product/${product.id}`}
                      className="p-2 text-culte-navy/40 hover:text-culte-navy transition-colors"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      to={`/seller/products/${product.id}/edit`}
                      className="p-2 text-culte-navy hover:text-culte-orange transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteId(product.id)}
                      className="p-2 text-culte-navy/40 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="font-valibuk text-lg text-culte-navy mb-2">NO PRODUCTS FOUND</p>
            <p className="text-culte-black/40 text-sm">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-culte-navy/60 z-50 flex items-center justify-center px-4">
          <div className="bg-white p-8 max-w-sm w-full">
            <h3 className="font-valibuk text-xl text-culte-navy mb-3">DELETE PRODUCT?</h3>
            <p className="text-sm text-culte-black/60 mb-8">This action cannot be undone. The product will be permanently removed from your catalogue.</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 bg-red-500 text-white py-3 font-valibuk text-xs tracking-widest hover:bg-red-600 transition-colors"
              >
                DELETE
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border-2 border-culte-navy/15 text-culte-navy py-3 font-valibuk text-xs tracking-widest hover:border-culte-navy transition-colors"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
