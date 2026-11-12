import { useState } from 'react';
import { ArrowDown, ArrowRight, Clock3, Droplets, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';

type Props = { cart: Record<string, number>; onAdd: (productId: string) => void };

export function HomePage({ cart, onAdd }: Props) {
  const [videoMuted, setVideoMuted] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);
  return (
    <div className="min-h-screen bg-[#0a1114]">
      <PageMeta title="Maison de parfum" description="Nuit Lumière — 30 авторских ароматов в драгоценных флаконах. Познакомьтесь с коллекцией парфюмерного дома." />
      <section className="hero-section relative flex min-h-[720px] items-end overflow-hidden px-6 pb-16 pt-32 sm:px-10 sm:pb-20 lg:min-h-screen lg:px-16">
        <div className="absolute inset-0 bg-[#071014]" />
        {!videoFailed ? (
          <video className="absolute inset-0 h-full w-full object-cover object-center" autoPlay loop muted={videoMuted} playsInline preload="metadata" poster="/nuit-lumiere-poster.jpg" aria-label="Кинематографичный ролик Nuit Lumière" onError={() => setVideoFailed(true)}>
            <source src="/nuit-lumiere-hero.mp4" type="video/mp4" />
          </video>
        ) : <img className="absolute inset-0 h-full w-full object-cover" src="/nuit-lumiere-poster.jpg" alt="Запасной кадр Nuit Lumière" />}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,12,14,.82)_0%,rgba(5,12,14,.54)_48%,rgba(5,12,14,.12)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071014] via-transparent to-[#071014]/35" />
        <div className="firefly left-[12%] top-[27%] h-2 w-2" /><div className="firefly left-[24%] top-[43%] h-1.5 w-1.5 [animation-delay:1.5s]" /><div className="firefly right-[20%] top-[28%] h-2 w-2 [animation-delay:.7s]" /><div className="firefly right-[12%] top-[61%] h-1.5 w-1.5 [animation-delay:2.1s]" />
        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-end gap-12 lg:grid-cols-[1.15fr_.85fr]">
          <div className="max-w-2xl animate-rise">
            <p className="mb-6 flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-[#e0c39d] sm:text-[10px] sm:tracking-[0.35em]"><span className="h-px w-8 bg-[#e0c39d]" /> Maison de parfum · 30 créations</p>
            <h1 className="font-serif text-[clamp(4rem,10vw,9.5rem)] leading-[.83] tracking-[-0.055em] text-[#f8f0e5]">Nuit<br /><em className="ml-[.65em] font-light text-[#b6d0d1]">Lumière</em></h1>
            <p className="mt-8 max-w-md text-base leading-7 text-white/75 sm:text-lg">Тридцать ароматов. Тридцать способов оставить за собой красивый шлейф.</p>
            <div className="mt-9 flex flex-wrap items-center gap-4 sm:gap-5">
              <Link to="/collection" className="premium-button group">Открыть коллекцию <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></Link>
              <Link to="/maison" className="inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-white sm:text-[10px] sm:tracking-[0.17em]">История Maison <ArrowDown size={13} /></Link>
            </div>
          </div>
          <div className="hidden justify-self-end pb-2 lg:block"><div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.26em] text-white/55 [writing-mode:vertical-rl]"><span>Почувствуй свой вечерний аромат</span><span className="h-16 w-px bg-white/35" /><span>01 — 30</span></div></div>
        </div>
        <button type="button" onClick={() => setVideoMuted((muted) => !muted)} className="absolute bottom-7 right-6 z-10 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/25 px-3 py-2 text-[9px] uppercase tracking-[0.11em] text-white/75 backdrop-blur-md transition hover:bg-black/40 sm:right-10 sm:text-[10px] sm:tracking-[0.13em] lg:right-16" aria-label={videoMuted ? 'Включить музыку' : 'Выключить музыку'}>
          {videoMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}<span>{videoMuted ? 'Включить музыку' : 'Музыка включена'}</span>
        </button>
      </section>

      <section className="border-y border-white/10 bg-[#0b1518] px-5 py-5 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-4 text-center text-[9px] uppercase tracking-[0.15em] text-white/60 sm:grid-cols-3 sm:gap-6 sm:text-[10px] sm:tracking-[0.19em]">
          <span className="flex items-center justify-center gap-2"><Sparkles size={14} className="text-[#d4b58b]" /> 30 авторских композиций</span><span className="flex items-center justify-center gap-2"><Droplets size={14} className="text-[#d4b58b]" /> Eau de parfum</span><span className="flex items-center justify-center gap-2"><Clock3 size={14} className="text-[#d4b58b]" /> Выразительный шлейф</span>
        </div>
      </section>

      <section className="bg-[#f1e9dc] px-5 py-20 text-[#18272a] sm:px-10 sm:py-28 lg:px-16">
        <div className="mx-auto grid max-w-[1300px] items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <div className="order-2 lg:order-1"><div className="overflow-hidden rounded-[1.3rem]"><img src="/perfume-atelier.jpg" alt="Коллекция авторских флаконов Nuit Lumière на постаментах из тёмного камня" loading="lazy" decoding="async" className="collection-art-image aspect-[1.4] w-full object-cover transition-transform duration-700 hover:scale-[1.025]" /></div><p className="mt-3 text-[8px] uppercase tracking-[0.22em] text-[#8d7c64]">Objets de parfum · коллекция Nuit Lumière</p></div>
          <div className="order-1 lg:order-2"><p className="mb-5 text-[9px] uppercase tracking-[0.3em] text-[#9a7651] sm:text-[10px] sm:tracking-[0.32em]">Искусство вечернего аромата</p><h2 className="max-w-xl font-serif text-5xl leading-[.95] tracking-[-.04em] sm:text-6xl">Свет, который<br /><em className="font-light text-[#76949a]">остаётся</em></h2><p className="mt-6 max-w-lg text-base leading-7 text-[#536367] sm:text-xl sm:leading-8">Nuit Lumière — коллекция для тех мгновений, когда день уже стих, а ночь только набирает глубину.</p><p className="mt-5 max-w-lg text-sm leading-7 text-[#788487]">Каждый флакон задуман как маленький объект искусства: драгоценный оттенок стекла, холодный отблеск металла и аромат для своего настроения.</p><Link to="/maison" className="mt-7 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-[#526e71] hover:text-[#18272a]">История парфюмерного дома <ArrowRight size={14} /></Link></div>
        </div>
      </section>

      <section className="bg-[#0c171a] px-4 py-20 sm:px-8 sm:py-24 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end sm:mb-12"><div><p className="mb-4 text-[9px] uppercase tracking-[0.3em] text-[#d4b58b] sm:text-[10px] sm:tracking-[0.32em]">Сначала почувствуйте</p><h2 className="font-serif text-4xl tracking-[-.04em] sm:text-5xl lg:text-6xl">Избранные ароматы</h2></div><Link to="/collection" className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-white/65 transition-colors hover:text-white sm:text-[10px] sm:tracking-[0.2em]">Вся коллекция · 30 <ArrowRight size={14} /></Link></div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 sm:gap-y-12 md:grid-cols-3">{products.slice(0, 3).map((product) => <ProductCard key={product.id} product={product} number={products.indexOf(product) + 1} quantity={cart[product.id] ?? 0} onAdd={onAdd} />)}</div>
        </div>
      </section>

      <section className="bg-[#dfe9e8] px-5 py-16 text-[#142326] sm:px-10 sm:py-20 lg:px-16">
        <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><p className="mb-3 text-[9px] uppercase tracking-[0.3em] text-[#71898c]">Maison Nuit Lumière</p><h2 className="font-serif text-3xl sm:text-4xl">Найдите ноту, которая звучит по-вашему</h2></div><Link to="/collection" className="premium-button w-fit">Исследовать коллекцию <ArrowRight size={14} /></Link></div>
      </section>
    </div>
  );
}
