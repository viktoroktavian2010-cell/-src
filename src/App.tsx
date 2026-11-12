import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartDrawer, type CartLine } from '@/components/CartDrawer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { products } from '@/data/products';
import { CollectionPage } from '@/pages/CollectionPage';
import { ContactPage } from '@/pages/ContactPage';
import { DeliveryPage } from '@/pages/DeliveryPage';
import { HomePage } from '@/pages/HomePage';
import { MaisonPage } from '@/pages/MaisonPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { ProductPage } from '@/pages/ProductPage';

type Cart = Record<string, number>;
type CheckoutStep = 'cart' | 'checkout';

const CART_STORAGE_KEY = 'nuit-lumiere-cart-v2';
const OLD_CART_STORAGE_KEY = 'nuit-lumiere-cart-quantity';

function sanitizeCart(raw: unknown): Cart {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
  const source = raw as Record<string, unknown>;
  const cart: Cart = {};
  for (const product of products) {
    const quantity = source[product.id];
    if (typeof quantity === 'number' && Number.isInteger(quantity) && quantity > 0 && quantity <= 99) cart[product.id] = quantity;
  }
  return cart;
}

function loadCart(): Cart {
  try {
    const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart !== null) return sanitizeCart(JSON.parse(savedCart));
    const legacyQuantity = Number(window.localStorage.getItem(OLD_CART_STORAGE_KEY));
    if (Number.isInteger(legacyQuantity) && legacyQuantity > 0 && products[0]) return { [products[0].id]: Math.min(legacyQuantity, 99) };
  } catch {
    return {};
  }
  return {};
}

function Storefront() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('cart');
  const [orderComplete, setOrderComplete] = useState(false);
  const [cart, setCart] = useState<Cart>(loadCart);
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const itemCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const lines: CartLine[] = products.flatMap((product, index) => {
    const quantity = cart[product.id] ?? 0;
    return quantity > 0 ? [{ product, quantity, number: index + 1 }] : [];
  });
  const total = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  useEffect(() => {
    try {
      if (itemCount > 0) window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      else window.localStorage.removeItem(CART_STORAGE_KEY);
      window.localStorage.removeItem(OLD_CART_STORAGE_KEY);
    } catch {
      // Keep the current cart in memory when browser storage is unavailable.
    }
  }, [cart, itemCount]);

  useEffect(() => {
    if (!cartOpen && !orderComplete) return;
    const previousOverflow = document.body.style.overflow;
    const cartButton = cartButtonRef.current;
    document.body.style.overflow = 'hidden';
    const dialog = document.querySelector<HTMLElement>('[role="dialog"]');
    const firstFocusable = dialog?.querySelector<HTMLElement>('button:not([disabled]), input:not([disabled]), a[href]');
    firstFocusable?.focus();
    const handleDialogKeys = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCartOpen(false);
        setOrderComplete(false);
        setCheckoutStep('cart');
        return;
      }
      if (event.key === 'Tab' && dialog) {
        const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter((element) => element.offsetParent !== null);
        if (focusable.length === 0) {
          event.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleDialogKeys);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleDialogKeys);
      window.requestAnimationFrame(() => {
        if (document.querySelector('[role="dialog"]')) return;
        const target = returnFocusRef.current;
        if (target?.isConnected) target.focus();
        else cartButton?.focus();
      });
    };
  }, [cartOpen, orderComplete]);

  const openCart = () => {
    const active = document.activeElement;
    if (active instanceof HTMLElement) returnFocusRef.current = active;
    setCheckoutStep('cart');
    setCartOpen(true);
  };

  const addToCart = (productId: string) => {
    const active = document.activeElement;
    if (active instanceof HTMLElement) returnFocusRef.current = active;
    setCart((current) => ({ ...current, [productId]: Math.min((current[productId] ?? 0) + 1, 99) }));
    setCheckoutStep('cart');
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
    setCheckoutStep('cart');
  };

  const changeQuantity = (productId: string, nextQuantity: number) => {
    setCart((current) => {
      const next = { ...current };
      if (nextQuantity <= 0) delete next[productId];
      else next[productId] = Math.min(nextQuantity, 99);
      return next;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((current) => {
      const next = { ...current };
      delete next[productId];
      return next;
    });
  };

  const submitDemoOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCart({});
    setCartOpen(false);
    setCheckoutStep('cart');
    setOrderComplete(true);
  };

  return (
    <div className="min-h-screen bg-[#0a1114] text-[#f6efe4]">
      <ScrollToTop />
      <SiteHeader itemCount={itemCount} cartButtonRef={cartButtonRef} onOpenCart={openCart} />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage cart={cart} onAdd={addToCart} />} />
          <Route path="/collection" element={<CollectionPage cart={cart} onAdd={addToCart} />} />
          <Route path="/aroma/:id" element={<ProductPage onAdd={addToCart} />} />
          <Route path="/maison" element={<MaisonPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
      {cartOpen && <CartDrawer lines={lines} itemCount={itemCount} total={total} step={checkoutStep} onClose={closeCart} onChangeQuantity={changeQuantity} onRemove={removeFromCart} onCheckout={() => setCheckoutStep('checkout')} onBack={() => setCheckoutStep('cart')} onSubmit={submitDemoOrder} />}
      {orderComplete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#061012]/80 px-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOrderComplete(false); }}>
          <section className="relative w-full max-w-md rounded-3xl bg-[#f4eee5] p-7 text-center text-[#172528] shadow-2xl sm:p-10" role="dialog" aria-modal="true" aria-labelledby="demo-order-title">
            <button type="button" onClick={() => setOrderComplete(false)} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#203337]/15" aria-label="Закрыть подтверждение"><X size={16} /></button>
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#718b87]/30 text-[#718b87]"><Check size={22} /></span>
            <p className="mt-5 text-[9px] uppercase tracking-[0.24em] text-[#829194]">Nuit Lumière · démonstration</p>
            <h2 id="demo-order-title" className="mt-3 font-serif text-3xl">Демо оформлено</h2>
            <p className="mt-3 text-sm leading-6 text-[#718184]">Это только проверка интерфейса. Реальный заказ не создан, данные не отправлены, оплата не выполнена.</p>
            <button type="button" onClick={() => setOrderComplete(false)} className="mt-7 w-full rounded-full bg-[#172528] px-5 py-3.5 text-[9px] uppercase tracking-[0.17em] text-[#f4eee5] transition hover:bg-[#33484a]">Продолжить знакомство <ArrowRight size={14} className="ml-2 inline" /></button>
          </section>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return <BrowserRouter><Storefront /></BrowserRouter>;
}
