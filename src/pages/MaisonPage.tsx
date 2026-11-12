import { ArrowRight, Gem, MoonStar, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';

const principles = [
  { icon: MoonStar, title: 'Время тишины', text: 'Ароматы, созданные для вечернего ритуала и личного пространства.' },
  { icon: Gem, title: 'Объект с характером', text: 'Авторские силуэты флаконов, огранённое стекло и металлические акценты.' },
  { icon: Sparkles, title: 'Свой почерк', text: 'Тридцать композиций, каждая со своим настроением и драгоценным оттенком.' },
];

export function MaisonPage() {
  return (
    <div className="min-h-screen bg-[#0c171a] pt-28 sm:pt-32">
      <PageMeta title="О Maison Nuit Lumière" description="История и принципы Nuit Lumière — авторской концепции вечерней парфюмерии и самостоятельных дизайнов флаконов." />
      <section className="px-5 pb-16 sm:px-10 sm:pb-20 lg:px-16"><div className="mx-auto max-w-[1300px]"><p className="mb-5 text-[9px] uppercase tracking-[0.3em] text-[#d4b58b] sm:text-[10px]">L'esprit de la maison</p><div className="grid items-end gap-8 lg:grid-cols-[1.2fr_.8fr]"><h1 className="max-w-4xl font-serif text-5xl leading-[.92] tracking-[-.05em] text-[#f4eee5] sm:text-7xl lg:text-8xl">Красота<br />в <em className="font-light text-[#9ebcc0]">полутоне</em></h1><p className="max-w-md pb-2 text-base leading-7 text-white/55 sm:text-lg sm:leading-8">Nuit Lumière — авторская идея парфюмерного дома, посвящённая тихой выразительности вечернего аромата.</p></div></div></section>
      <section className="border-y border-white/10 bg-[#101d20] px-5 py-12 sm:px-10 sm:py-16 lg:px-16"><div className="mx-auto grid max-w-[1300px] gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">{principles.map(({ icon: Icon, title, text }, index) => <article key={title} className="bg-[#101d20] p-6 sm:p-8"><span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d3b98d]/35 text-[#d3b98d]"><Icon size={18} /></span><p className="mt-6 text-[9px] uppercase tracking-[0.22em] text-white/35">0{index + 1} · Maison</p><h2 className="mt-2 font-serif text-2xl text-[#f3ece1]">{title}</h2><p className="mt-3 text-sm leading-6 text-white/50">{text}</p></article>)}</div></section>
      <section className="px-5 py-16 sm:px-10 sm:py-24 lg:px-16"><div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[.6fr_1.4fr]"><p className="text-[9px] uppercase tracking-[0.28em] text-[#d4b58b]">Un univers de parfum</p><div className="max-w-3xl"><p className="font-serif text-3xl leading-snug text-[#e7ddd0] sm:text-4xl">Не громче мгновения — точнее его.</p><div className="mt-6 grid gap-5 text-sm leading-7 text-white/50 sm:grid-cols-2"><p>В центре Nuit Lumière — контраст прохладного стекла и тёплой кожи, прозрачного начала и долгого шлейфа. Так рождается язык коллекции: интимный, выразительный, без лишних жестов.</p><p>Каждый дизайн флакона создан для этой витрины как самостоятельная авторская иллюстрация: с собственной формой, палитрой и отделкой. Названия и описания коллекции — демонстрационный контент, подготовленный для макета магазина.</p></div><Link to="/collection" className="mt-8 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.17em] text-[#d9c49c] transition-colors hover:text-white">Познакомиться с коллекцией <ArrowRight size={14} /></Link></div></div></section>
      <section className="bg-[#dfe9e8] px-5 py-12 text-[#142326] sm:px-10 sm:py-16 lg:px-16"><div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><p className="text-[9px] uppercase tracking-[0.24em] text-[#71898c]">La collection · 30 créations</p><h2 className="mt-2 font-serif text-3xl">Найдите свой вечерний аккорд</h2></div><Link to="/collection" className="premium-button w-fit">Открыть каталог <ArrowRight size={14} /></Link></div></section>
    </div>
  );
}
