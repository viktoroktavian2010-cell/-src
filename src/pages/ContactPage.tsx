import { ArrowRight, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0c171a] pt-28 sm:pt-32">
      <PageMeta title="Контакты Maison" description="Страница контактов Nuit Lumière. Перед коммерческой публикацией владелец должен добавить проверенные каналы связи." />
      <section className="px-5 pb-16 sm:px-10 sm:pb-24 lg:px-16"><div className="mx-auto grid max-w-[1250px] gap-12 lg:grid-cols-[1fr_.8fr]"><div><p className="mb-5 text-[9px] uppercase tracking-[0.3em] text-[#d4b58b] sm:text-[10px]">Correspondance</p><h1 className="max-w-2xl font-serif text-5xl leading-[.95] tracking-[-.04em] text-[#f4eee5] sm:text-7xl">Мы ценим<br /><em className="font-light text-[#9ebcc0]">личный контакт</em></h1><p className="mt-6 max-w-lg text-base leading-7 text-white/55 sm:text-lg sm:leading-8">Для вопросов о Maison, композициях и подборе аромата здесь будут размещены официальные каналы связи бренда.</p><Link to="/collection" className="premium-button mt-8 w-fit">Вернуться к ароматам <ArrowRight size={14} /></Link></div>
        <aside className="rounded-2xl border border-white/10 bg-[#101d20] p-6 sm:p-8"><p className="text-[9px] uppercase tracking-[0.24em] text-[#d4b58b]">Maison Nuit Lumière</p><div className="mt-7 flex gap-4 border-t border-white/10 pt-6"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#d7bf95]"><Mail size={17} /></span><div><h2 className="font-serif text-xl text-[#f3ece1]">Электронная почта</h2><p className="mt-2 text-sm leading-6 text-white/45">Укажите действующий адрес службы поддержки перед публикацией сайта.</p></div></div><div className="mt-6 flex gap-4 border-t border-white/10 pt-6"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#d7bf95]"><MessageCircle size={17} /></span><div><h2 className="font-serif text-xl text-[#f3ece1]">Связь с Maison</h2><p className="mt-2 text-sm leading-6 text-white/45">Контактные данные не выдуманы и не подключены в этой демонстрационной версии.</p></div></div><p className="mt-7 rounded-xl border border-[#d2b88b]/20 bg-[#d2b88b]/[0.06] p-4 text-xs leading-5 text-[#d0c1a8]">Форма и сообщения не отправляются на сервер. Добавьте реальные контакты и защищённую обработку запросов для запуска магазина.</p></aside>
      </div></section>
    </div>
  );
}
