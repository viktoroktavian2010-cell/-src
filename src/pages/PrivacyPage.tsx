import { PageMeta } from '@/components/PageMeta';
import { Link } from 'react-router-dom';

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0c171a] pt-28 sm:pt-32">
      <PageMeta title="Конфиденциальность" description="Описание обработки данных в демонстрационной версии сайта Nuit Lumière." />
      <article className="mx-auto max-w-[1000px] px-5 pb-20 sm:px-10 sm:pb-28 lg:px-16"><p className="mb-5 text-[9px] uppercase tracking-[0.28em] text-[#d4b58b]">Informations légales</p><h1 className="font-serif text-[clamp(1.75rem,8.4vw,4.5rem)] tracking-[-.04em] text-[#f4eee5] sm:text-7xl">Конфиденциальность</h1><p className="mt-5 text-sm text-white/40">Информация для демонстрационной версии</p><div className="mt-10 space-y-7 border-t border-white/10 pt-8 text-sm leading-7 text-white/60"><section><h2 className="font-serif text-2xl text-[#f1e9dc]">Данные в макете</h2><p className="mt-3">Корзина хранится только в локальном хранилище этого браузера. Демонстрационная форма оформления проверяет обязательные поля на устройстве, но не отправляет и не сохраняет имя, адрес, телефон или электронную почту.</p></section><section><h2 className="font-serif text-2xl text-[#f1e9dc]">Перед коммерческим запуском</h2><p className="mt-3">Этот текст не заменяет юридическую политику реального магазина. Владелец должен указать оператора данных, цели и сроки обработки, используемые сервисы, права пользователей и способ обращения, исходя из фактической архитектуры и применимых правил.</p></section><section><h2 className="font-serif text-2xl text-[#f1e9dc]">Внешние сервисы</h2><p className="mt-3">В проекте не подключена серверная аналитика, платёжный провайдер или система обработки заказов. После добавления таких сервисов страницу необходимо актуализировать до публикации.</p></section></div><Link to="/contact" className="mt-9 inline-flex text-[9px] uppercase tracking-[0.18em] text-[#d9c49c] hover:text-white">Страница контактов →</Link></article>
    </div>
  );
}
