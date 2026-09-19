import React from 'react';
import { 
  Sparkles, 
  Smartphone, 
  Laptop, 
  Headphones, 
  Watch, 
  Gamepad2, 
  Layers 
} from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { CategoryId } from '../types';

interface CategorySectionProps {
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5" />;
      case 'Laptop': return <Laptop className="w-5 h-5" />;
      case 'Headphones': return <Headphones className="w-5 h-5" />;
      case 'Watch': return <Watch className="w-5 h-5" />;
      case 'Gamepad2': return <Gamepad2 className="w-5 h-5" />;
      default: return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <section id="categories-section" className="py-8 bg-slate-900/40 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Navegação Rápida</span>
            <h2 className="font-['Outfit',sans-serif] text-2xl font-bold text-white tracking-tight">
              Categorias em Destaque
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Selecione uma categoria para filtrar o catálogo instantaneamente
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`category-card-${cat.id}`}
                onClick={() => {
                  onSelectCategory(cat.id);
                  const catalogEl = document.getElementById('catalog-section');
                  if (catalogEl) {
                    catalogEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`flex flex-col items-center text-center p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isSelected 
                    ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-lg shadow-cyan-500/10' 
                    : 'bg-slate-900/80 hover:bg-slate-800/90 border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                  isSelected ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-cyan-400'
                }`}>
                  {getCategoryIcon(cat.iconName)}
                </div>
                <span className="text-xs font-bold font-['Outfit',sans-serif] tracking-wide">
                  {cat.label}
                </span>
                <span className="text-[11px] text-slate-400 mt-1">
                  {cat.productCount} produtos
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
