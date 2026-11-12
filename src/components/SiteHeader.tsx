import { useEffect, useState, type RefObject } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

type Props = {
  itemCount: number;
  cartButtonRef: RefObject<HTMLButtonElement>;
  onOpenCart: () => void;
};

const navItems = [
  { to: '/collection', label: 'Коллекция' },
  { to: '/maison', label: 'Maison' },
  { to: '/delivery', label: 'Доставка' },
  { to: '/contact', label: 'Контакты' },
];

export function SiteHeader({ itemCount, cartButtonRef, onOpenCart }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <header className="site-header absolute inset-x-0 top-0 z-30 px-3 py-5 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-2 sm:gap-4">
        <Link to="/" className="group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3" aria-label="Nuit Lumière — главная">
          <span className="brand-mark" aria-hidden="true"><span>NL</span></span>
          <span className="truncate font-serif text-base tracking-[0.1em] text-white transition-opacity group-hover:opacity-75 sm:text-xl sm:tracking-[0.14em]">Nuit Lumière</span>
        </Link>
        <nav className="hidden items-center gap-5 text-[9px] uppercase tracking-[0.19em] text-white/65 lg:flex xl:gap-7 xl:text-[10px]" aria-label="Главная навигация">
          {navItems.map(({ to, label }) => <NavLink key={to} to={to} className={({ isActive }) => `transition-colors hover:text-white ${isActive ? 'text-[#e5cfaa]' : ''}`}>{label}</NavLink>)}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <button ref={cartButtonRef} type="button" onClick={onOpenCart} className="cart-trigger" aria-label={`Открыть корзину, товаров: ${itemCount}`}>
            <span className="hidden sm:inline">Корзина</span><span className="max-[360px]:hidden sm:hidden">Сумка</span><ShoppingBag className="hidden max-[360px]:inline sm:hidden" size={14} aria-hidden="true" /><span className="cart-count" aria-live="polite">{itemCount}</span>
          </button>
          <button type="button" onClick={() => setMenuOpen((open) => !open)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/10 text-white backdrop-blur-sm lg:hidden" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="absolute right-3 top-[4.5rem] flex w-60 flex-col gap-5 rounded-2xl border border-white/15 bg-[#111c20]/95 p-5 text-xs uppercase tracking-[0.2em] text-white/85 shadow-2xl backdrop-blur-xl sm:right-8 lg:hidden" aria-label="Мобильная навигация">
            {navItems.map(({ to, label }) => <NavLink key={to} to={to} onClick={() => setMenuOpen(false)} className={({ isActive }) => `transition-colors hover:text-white ${isActive ? 'text-[#e5cfaa]' : ''}`}>{label}</NavLink>)}
            <Link to="/privacy" onClick={() => setMenuOpen(false)} className="border-t border-white/10 pt-4 text-[10px] normal-case tracking-normal text-white/55">Конфиденциальность</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
