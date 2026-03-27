import React from 'react';
import { Product } from '../../types';
import ProductCard from '../ProductCard';

interface CategorySectionProps {
  title: string;
  products: Product[];
  id?: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, products, id }) => (
  <section id={id} className="py-20 border-b border-gray-100 last:border-0">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
            {title}
          </h2>
          <div className="h-2 w-24 bg-brutamed-primary mt-4" />
        </div>
      </div>

      {products.length === 0 ? (
        <div className="py-20 text-center bg-gray-50 border border-dashed border-gray-200">
          <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Em breve novos produtos nesta categoria</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id || product.name} product={product} />
          ))}
        </div>
      )}
    </div>
  </section>
);

export default CategorySection;
