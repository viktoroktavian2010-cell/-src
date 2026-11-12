import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';
import { ProductCard } from '@/components/ProductCard';
import { categoryFilters, products, type ScentCategory } from '@/data/products';

type Props = { cart: Record<string, number>; onAdd: (productId: string) => void };
type SortMode = 'curated' | 'price-asc' | 'price-desc' | 'name';

export function CollectionPage({ cart, onAdd }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawFamily = searchParams.get('family');
  const activeCategory: ScentCategory = categoryFilters.includes(rawFamily as ScentCategory) && rawFamily !== 'Все ароматы' ? rawFamily as ScentCategory : 'Все ароматы';
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('curated');

  const chooseCategory = (value: ScentCategory) => {
    const next = new URLSearchParams(searchParams);
    if (value === 'Все ароматы') next.delete('family');
    else next.set('family', value);
    setSearchParams(next);
  };

  const visibleProducts = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase('ru-RU');
    const filtered = products.filter((product) => {
      const matchesCategory = activeCategory === 'Все ароматы' || product.category === activeCategory;
      const searchable = `${product.name} ${product.notes} ${product.description} ${product.category}`.toLocaleLowerCase('ru-RU');
      return matchesCategory && (!query || searchable.includes(query));
    });
    if (sortMode === 'price-asc') return [...filtered].sort((a, b) => a.price - b.price);
    if (sortMode === 'price-desc') return [...filtered].sort((a, b) => b.price - a.price);
    if (sortMode === 'name') return [...filtered].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    return filtered;
  }, [activeCategory, searchQuery, sortMode]);

  return (
    <div className="min-h-screen bg-[#0c171a] pt-28 sm:pt-32">
      <PageMeta title="Коллекция ароматов" description="30 ароматов Nuit Lumière в коллекции Eau de parfum: цветочные, древесные, свежие, амбровые и пряные композиции. Цены в евро." />
      <section className="px-4 pb-12 sm:px-8 sm:pb-16 lg:px-16">
        <div className="mx-auto grid max-w-[1400px] items-center gap-8 lg:grid-cols-[.88fr_1.12fr] lg:gap-14">
          <div className="max-w-xl px-1 sm:px-0"><p className="mb-5 flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-[#d4b58b] sm:text-[10px] sm:tracking-[0.32em]"><span className="h-px w-7 bg-[#d4b58b]" /> La collection · 01—30</p><h1 className="font-serif text-5xl leading-[.93] tracking-[-.045em] sm:text-6xl lg:text-7xl">Тридцать<br /><em className="font-light text-[#9ebcc0]">историй</em></h1><p className="mt-6 max-w-md text-sm leading-6 text-white/60 sm:text-base sm:leading-7">Найдите свой аромат среди авторских композиций — от прозрачных цитрусов до глубоких смол и бархатных цветов.</p><p className="mt-4 text-[9px] uppercase tracking-[0.18em] text-[#c5ad87] sm:tracking-[0.2em]">Все цены в евро · демонстрационная коллекция</p></div>
          <div className="collection-art relative aspect-[1.45] overflow-hidden rounded-[1.25rem] border border-white/10 sm:aspect-[1.8] lg:aspect-[1.55]"><img src="/perfume-atelier.jpg" alt="Коллекция флаконов Nuit Lumière из драгоценного стекла и металла" loading="lazy" decoding="async" className="collection-art-image h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-[#0b1518]/60 via-transparent to-transparent" /><span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/20 px-3 py-2 text-[8px] uppercase tracking-[0.17em] text-white/80 backdrop-blur-sm sm:bottom-5 sm:left-5 sm:text-[9px]">Objets de parfum · Nuit Lumière</span></div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-8 lg:px-16" aria-label="Каталог ароматов">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="catalog-search-wrap flex min-h-12 flex-1 items-center gap-3 rounded-full border border-white/15 bg-white/[0.035] px-4 sm:max-w-md"><Search size={16} className="shrink-0 text-[#c1a87c]" /><input type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Название, нота или настроение" aria-label="Поиск по ароматам" className="catalog-search min-w-0 flex-1 bg-transparent text-sm text-[#f4eee5] placeholder:text-white/35" />{searchQuery && <button type="button" onClick={() => setSearchQuery('')} className="text-white/50 hover:text-white" aria-label="Очистить поиск"><X size={15} /></button>}</label>
            <label className="sr-only" htmlFor="sort-products">Сортировка ароматов</label><select id="sort-products" value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)} className="catalog-sort min-h-12 rounded-full border border-white/15 bg-[#111d20] px-4 text-xs text-white/75 sm:w-auto"><option value="curated">Порядок коллекции</option><option value="price-asc">Сначала дешевле</option><option value="price-desc">Сначала дороже</option><option value="name">По названию</option></select>
          </div>
          <div className="mt-5 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0" aria-label="Фильтр ароматов по семейству"><div className="flex min-w-max gap-2 pb-2" role="group" aria-label="Семейства ароматов">{categoryFilters.map((filter) => <button key={filter} type="button" onClick={() => chooseCategory(filter)} className={`category-chip ${activeCategory === filter ? 'category-chip-active' : ''}`} aria-pressed={activeCategory === filter}>{filter}</button>)}</div></div>
          <div className="mt-5 flex items-center justify-between border-b border-white/10 pb-3 text-[9px] uppercase tracking-[0.18em] text-white/40 sm:text-[10px] sm:tracking-[0.2em]"><span aria-live="polite">{visibleProducts.length === products.length ? 'Полная коллекция' : 'Найдено ароматов'} · {visibleProducts.length}</span><span>50 мл · Eau de parfum</span></div>
          {visibleProducts.length > 0 ? <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-9 sm:mt-8 sm:gap-x-5 sm:gap-y-12 md:grid-cols-3 xl:grid-cols-4">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} number={products.findIndex((item) => item.id === product.id) + 1} quantity={cart[product.id] ?? 0} onAdd={onAdd} />)}</div> : <div className="flex min-h-60 flex-col items-center justify-center text-center"><p className="font-serif text-2xl text-[#f4eee5]">Такого сочетания пока нет</p><p className="mt-2 max-w-sm text-sm text-white/50">Измените поисковый запрос или выберите другое семейство ароматов.</p><button type="button" onClick={() => { setSearchQuery(''); chooseCategory('Все ароматы'); }} className="mt-5 text-[10px] uppercase tracking-[0.18em] text-[#d8c49f] underline underline-offset-4">Показать все 30 ароматов</button></div>}
        </div>
      </section>
    </div>
  );
}
