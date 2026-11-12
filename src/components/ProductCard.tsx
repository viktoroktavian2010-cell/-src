import { Check, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BottleVisual } from '@/components/BottleVisual';
import type { Product } from '@/data/products';
import { formatPrice } from '@/lib/money';

type Props = {
  product: Product;
  number: number;
  quantity: number;
  onAdd: (productId: string) => void;
};

export function ProductCard({ product, number, quantity, onAdd }: Props) {
  const productPath = `/aroma/${product.id}`;
  return (
    <article className="product-card group">
      <div className="relative overflow-hidden rounded-[1.1rem]">
        <Link to={productPath} aria-label={`Подробнее об аромате ${product.name}`} className="block focus-visible:outline-offset-4">
          <BottleVisual product={product} number={number} />
        </Link>
        <span className="product-category-pill">{product.category}</span>
      </div>
      <div className="px-1 pb-1 pt-4 sm:px-2 sm:pt-5">
        <p className="mb-2 text-[8px] uppercase tracking-[0.2em] text-[#bfa77d] sm:text-[9px]">Eau de parfum · 50 мл</p>
        <h3 className="font-serif text-[17px] leading-tight text-[#f4eee5] sm:text-[20px]"><Link to={productPath} className="transition-colors hover:text-[#d9c39d]">{product.name}</Link></h3>
        <p className="product-notes mt-2 text-[10px] leading-4 text-white/50 sm:text-xs">{product.notes}</p>
        <p className="mt-4 text-[15px] font-medium tracking-wide text-[#e8dbc4] sm:text-lg">{formatPrice(product.price)}</p>
        <button
          type="button"
          onClick={() => onAdd(product.id)}
          className={`product-add-button mt-3 w-full ${quantity > 0 ? 'product-add-button-added' : ''}`}
          aria-label={`Добавить ${product.name} в корзину`}
        >
          {quantity > 0 ? <Check size={13} /> : <Plus size={13} />}
          <span>{quantity > 0 ? `В корзине · ${quantity}` : 'Добавить'}</span>
        </button>
      </div>
    </article>
  );
}
