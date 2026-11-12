import { ArrowRight, Box, RotateCcw, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';

const topics = [
  { icon: Box, number: '01', title: 'Доставка', text: 'Страны, сроки и стоимость зависят от будущей логистики магазина и должны быть указаны владельцем перед началом продаж.' },
  { icon: RotateCcw, number: '02', title: 'Возврат', text: 'Порядок и сроки возврата необходимо утвердить и опубликовать в соответствии с правилами юрисдикции, где работает магазин.' },
  { icon: ShieldCheck, number: '03', title: 'Оплата', text: 'В этой витрине подключён только локальный демонстрационный checkout. Платёжные данные не запрашиваются.' },
];

export function DeliveryPage() {
  return (
    <div className="min-h-screen bg-[#0c171a] pt-28 sm:pt-32">
      <PageMeta title="Доставка и возврат" description="Информация о доставке, возвратах и оплате в демонстрационной витрине Nuit Lumière." />
      <section className="px-5 pb-14 sm:px-10 sm:pb-20 lg:px-16"><div className="mx-auto max-w-[1300px]"><p className="mb-5 text-[9px] uppercase tracking-[0.3em] text-[#d4b58b] sm:text-[10px]">Service & informations</p><h1 className="max-w-3xl font-serif text-5xl leading-[.95] tracking-[-.04em] text-[#f4eee5] sm:text-7xl">Внимание<br /><em className="font-light text-[#9ebcc0]">к деталям</em></h1><p className="mt-6 max-w-xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8">Условия сервиса должны быть такими же продуманными, как композиция аромата. Здесь собраны разделы, которые владелец магазина заполнит перед коммерческим запуском.</p></div></section>
      <section className="border-y border-white/10 bg-[#101d20] px-5 py-12 sm:px-10 sm:py-16 lg:px-16"><div className="mx-auto grid max-w-[1300px] gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">{topics.map(({ icon: Icon, number, title, text }) => <article key={number} className="bg-[#101d20] p-6 sm:p-8"><div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d3b98d]/35 text-[#d3b98d]"><Icon size={18} /></span><span className="font-serif text-2xl text-white/20">{number}</span></div><h2 className="mt-6 font-serif text-2xl text-[#f3ece1]">{title}</h2><p className="mt-3 text-sm leading-6 text-white/50">{text}</p></article>)}</div></section>
      <section className="px-5 py-12 sm:px-10 sm:py-16 lg:px-16"><div className="mx-auto max-w-[1000px] rounded-2xl border border-[#d2b88b]/25 bg-[#101d20] p-6 sm:p-9"><p className="text-[9px] uppercase tracking-[0.25em] text-[#d4b58b]">Демонстрационный режим</p><h2 className="mt-3 font-serif text-3xl text-[#f3ece1]">Покупки пока не отправляются</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">Каталог и оформление показывают интерфейс магазина, но реальный заказ, оплата и доставка не выполняются. Перед запуском замените этот текст утверждёнными условиями, подключите обработку заказов и платёжный провайдер.</p><Link to="/contact" className="mt-6 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-[#d9c49c] hover:text-white">Контакты магазина <ArrowRight size={14} /></Link></div></section>
    </div>
  );
}
