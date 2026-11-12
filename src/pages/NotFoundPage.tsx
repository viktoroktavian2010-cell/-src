import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';

export function NotFoundPage() {
  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-[#0c171a] px-5 pb-12 pt-28 text-center sm:px-10"><PageMeta title="Страница не найдена" description="Эта страница Nuit Lumière недоступна." /><div className="max-w-xl"><p className="text-[10px] uppercase tracking-[0.32em] text-[#d4b58b]">Page introuvable · 404</p><h1 className="mt-5 font-serif text-6xl text-[#f4eee5] sm:text-8xl">Тихая<br /><em className="font-light text-[#9ebcc0]">пауза</em></h1><p className="mx-auto mt-5 max-w-sm text-sm leading-6 text-white/50">Похоже, эта страница осталась за пределами коллекции.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link to="/" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-[9px] uppercase tracking-[0.15em] text-white/75 hover:text-white"><ArrowLeft size={13} /> На главную</Link><Link to="/collection" className="premium-button">Открыть ароматы <ArrowRight size={13} /></Link></div></div></div>
  );
}
