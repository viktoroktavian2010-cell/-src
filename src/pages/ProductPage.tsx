import { ArrowLeft, ArrowRight, Droplets, Sparkles } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { BottleVisual } from '@/components/BottleVisual';
import { PageMeta } from '@/components/PageMeta';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/money';

type Props = { onAdd: (productId: string) => void };

export function ProductPage({ onAdd }: Props) {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  if (!product) return <NotFoundPage />;
  const number = products.findIndex((item) => item.id === product.id) + 1;
  const accords = product.notes.split(' · ');

  return (
    <div className="min-h-screen bg-[#0c171a] pt-28 sm:pt-32">
      <PageMeta title={product.name} description={`${product.name} — авторский Eau de parfum Nuit Lumière. ${product.notes}. Демонстрационная цена ${formatPrice(product.price)}.`} />
      <section className="px-4 pb-12 sm:px-8 sm:pb-16 lg:px-16">
        <div className="mx-auto max-w-[1300px]">
          <nav aria-label="Навигационная цепочка" className="mb-6 flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-white/45 sm:mb-9 sm:text-[10px]"><Link to="/" className="transition-colors hover:text-white">Главная</Link><span aria-hidden="true">/</span><Link to="/collection" className="transition-colors hover:text-white">Коллекция</Link><span aria-hidden="true">/</span><span className="text-[#d8c49f]">{product.name}</span></nav>
          <div className="grid items-center gap-8 md:grid-cols-[1fr_1fr] md:gap-12 lg:gap-20">
            <div className="mx-auto w-full max-w-[560px]"><BottleVisual product={product} number={number} /></div>
            <div className="max-w-xl py-2 md:py-8"><p className="flex items-center gap-3 text-[9px] uppercase tracking-[0.28em] text-[#d4b58b] sm:text-[10px] sm:tracking-[0.3em]"><span className="h-px w-7 bg-[#d4b58b]" /> Composition N° {String(number).padStart(2, '0')}</p><p className="mt-6 text-[10px] uppercase tracking-[0.22em] text-[#a8b9b8]">{product.category} · Eau de parfum</p><h1 className="mt-3 font-serif text-5xl leading-[.94] tracking-[-.045em] text-[#f5eee4] sm:text-6xl lg:text-7xl">{product.name}</h1><p className="mt-6 max-w-lg text-base leading-7 text-white/65 sm:text-lg sm:leading-8">{product.description}</p><p className="mt-5 max-w-lg text-sm leading-6 text-white/45">{product.notes}</p><div className="mt-8 flex flex-wrap items-center gap-3 text-[9px] uppercase tracking-[0.16em] text-white/55"><span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2"><Droplets size={13} className="text-[#d4b58b]" /> 50 мл</span><span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2"><Sparkles size={13} className="text-[#d4b58b]" /> Демо-цена EUR</span></div><div className="mt-8 flex flex-wrap items-end gap-4"><p className="font-serif text-3xl text-[#e8dbc4]">{formatPrice(product.price)}</p><span className="pb-1 text-[10px] text-white/40">цена для демонстрации макета</span></div><button type="button" onClick={() => onAdd(product.id)} className="premium-button mt-6 min-h-12 w-full justify-center sm:w-auto sm:min-w-64">Добавить в корзину <ArrowRight size={15} /></button><Link to="/collection" className="mt-5 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-white/45 transition-colors hover:text-white"><ArrowLeft size={13} /> Вернуться к коллекции</Link></div>
          </div>
        </div>
      </section>
      <section className="border-y border-white/10 bg-[#101d20] px-5 py-12 sm:px-10 sm:py-16 lg:px-16"><div className="mx-auto max-w-[1300px]"><p className="text-[9px] uppercase tracking-[0.28em] text-[#d4b58b]">Pyramide olfactive</p><h2 className="mt-3 font-serif text-3xl text-[#f3ece1] sm:text-4xl">Ноты композиции</h2><div className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">{accords.slice(0, 3).map((note, index) => <div key={`${note}-${index}`} className="bg-[#111d20] p-5 sm:p-7"><p className="text-[8px] uppercase tracking-[0.22em] text-white/40">{['Первое впечатление', 'Сердце аромата', 'Шлейф композиции'][index]}</p><p className="mt-3 font-serif text-xl text-[#e2d3b7]">{note}</p><p className="mt-2 text-xs leading-5 text-white/40">Часть авторской композиции {product.name}.</p></div>)}</div></div></section>
      <section className="px-5 py-12 sm:px-10 sm:py-16 lg:px-16"><div className="mx-auto flex max-w-[1300px] flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><p className="text-[9px] uppercase tracking-[0.24em] text-[#d4b58b]">Nuit Lumière · La collection</p><h2 className="mt-2 font-serif text-3xl text-[#f5eee4]">Откройте другие истории</h2></div><Link to="/collection" className="premium-button w-fit">Вся коллекция <ArrowRight size={14} /></Link></div></section>
    </div>
  );
}
