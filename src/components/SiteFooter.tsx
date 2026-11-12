import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#091114] px-5 py-10 text-white/55 sm:px-10 sm:py-12 lg:px-16">
      <div className="mx-auto grid max-w-[1400px] gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
        <div>
          <Link to="/" className="inline-flex items-center gap-3 text-white/85"><span className="brand-mark" aria-hidden="true"><span>NL</span></span><span className="font-serif text-xl tracking-[0.12em]">Nuit Lumière</span></Link>
          <p className="mt-5 max-w-xs text-xs leading-6 text-white/45">Тридцать историй, созданных для вечера. Найдите ноту, которая звучит по-вашему.</p>
        </div>
        <div><p className="mb-4 text-[9px] uppercase tracking-[0.24em] text-[#d5bd92]">Коллекция</p><ul className="space-y-3 text-xs"><li><Link className="footer-link" to="/collection">Все ароматы</Link></li><li><Link className="footer-link" to="/collection?family=Цветочные">Цветочные</Link></li><li><Link className="footer-link" to="/collection?family=Древесные">Древесные</Link></li><li><Link className="footer-link" to="/collection?family=Свежие">Свежие</Link></li></ul></div>
        <div><p className="mb-4 text-[9px] uppercase tracking-[0.24em] text-[#d5bd92]">Maison</p><ul className="space-y-3 text-xs"><li><Link className="footer-link" to="/maison">История дома</Link></li><li><Link className="footer-link" to="/delivery">Доставка и возврат</Link></li><li><Link className="footer-link" to="/contact">Контакты</Link></li></ul></div>
        <div><p className="mb-4 text-[9px] uppercase tracking-[0.24em] text-[#d5bd92]">Информация</p><ul className="space-y-3 text-xs"><li><Link className="footer-link" to="/privacy">Конфиденциальность</Link></li><li><Link className="footer-link" to="/contact">Связаться с Maison <ArrowUpRight size={12} className="ml-1 inline" /></Link></li></ul><p className="mt-5 text-[10px] leading-5 text-white/35">Демо-витрина · все цены в EUR</p></div>
      </div>
      <div className="mx-auto mt-9 flex max-w-[1400px] flex-col gap-2 border-t border-white/10 pt-5 text-[9px] leading-5 text-white/35 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Nuit Lumière</span><span>Демонстрационные товары и цены. Заказы и оплата не выполняются.</span></div>
    </footer>
  );
}
