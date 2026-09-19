import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, X, Tag } from 'lucide-react';
import { Product, CategoryId } from '../types';
import { CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onOpenProductModal: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount';

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  wishlistIds,
  onToggleWishlist,
  onOpenProductModal,
  onAddToCart,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category match
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchBrand = product.brand.toLowerCase().includes(query);
        const matchCategory = product.categoryLabel.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query);
        if (!matchName && !matchBrand && !matchCategory && !matchDesc) {
          return false;
        }
      }
      // In stock only
      if (onlyInStock && product.stock <= 0) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return (b.discountPercent || 0) - (a.discountPercent || 0);
      return 0; // 'featured' keep order
    });
  }, [products, selectedCategory, searchQuery, onlyInStock, sortBy]);

  return (
    <section id="catalog-section" className="py-16 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Loja Oficial
            </span>
            <h2 className="font-['Outfit',sans-serif] text-3xl font-bold text-white tracking-tight">
              Catálogo de Eletrônicos
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Produtos originais, lacrados e com garantia nacional de 1 ano
            </p>
          </div>

          {/* Search bar inside catalog */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="catalog-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar no catálogo..."
              className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Categories Pills & Controls Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          {/* Categories Tab Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full lg:w-auto scrollbar-none">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`catalog-tab-${cat.id}`}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sort and Filters */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end text-xs">
            {/* In-stock toggle */}
            <label className="flex items-center gap-2 text-slate-400 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 text-cyan-500 focus:ring-cyan-400 accent-cyan-500"
              />
              <span>Pronta Entrega</span>
            </label>

            {/* Sort selector */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
              <select
                id="catalog-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-slate-900">Em Destaque</option>
                <option value="price-asc" className="bg-slate-900">Menor Preço</option>
                <option value="price-desc" className="bg-slate-900">Maior Preço</option>
                <option value="rating" className="bg-slate-900">Melhores Avaliações</option>
                <option value="discount" className="bg-slate-900">Maiores Descontos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter / Active Filters */}
        <div className="flex items-center justify-between py-4 text-xs text-slate-400">
          <span>Mostrando <strong>{filteredProducts.length}</strong> produtos</span>
          {(searchQuery || selectedCategory !== 'all' || onlyInStock) && (
            <button
              onClick={() => {
                onSearchChange('');
                onSelectCategory('all');
                setOnlyInStock(false);
              }}
              className="text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-4 cursor-pointer"
            >
              Limpar todos os filtros
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.has(product.id)}
                onToggleWishlist={onToggleWishlist}
                onOpenProductModal={onOpenProductModal}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-slate-900/40 rounded-2xl border border-slate-800 max-w-lg mx-auto p-8">
            <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-white mb-1">
              Nenhum produto encontrado
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Não encontramos resultados para sua busca. Tente palavras-chave diferentes ou remova os filtros ativos.
            </p>
            <button
              onClick={() => {
                onSearchChange('');
                onSelectCategory('all');
                setOnlyInStock(false);
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition-colors cursor-pointer"
            >
              Ver todos os produtos
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
