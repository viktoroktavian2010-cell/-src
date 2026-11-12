import type { FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { BottleVisual } from '@/components/BottleVisual';
import type { Product } from '@/data/products';
import { formatPrice } from '@/lib/money';

export type CartLine = {
  product: Product;
  quantity: number;
  number: number;
};

type Props = {
  lines: CartLine[];
  itemCount: number;
  total: number;
  step: 'cart' | 'checkout';
  onClose: () => void;
  onChangeQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
  onBack: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function CartDrawer({
  lines,
  itemCount,
  total,
  step,
  onClose,
  onChangeQuantity,
  onRemove,
  onCheckout,
  onBack,
  onSubmit,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="absolute inset-0 bg-[#030809]/75 backdrop-blur-sm" aria-hidden="true" onClick={onClose} />
      <section className="cart-panel relative flex h-full w-full flex-col bg-[#f4eee5] text-[#172528] shadow-2xl sm:max-w-[560px]" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="flex items-center justify-between border-b border-[#243538]/10 px-5 py-4 sm:px-8 sm:py-5">
          <div>
            <p className="text-[9px] uppercase tracking-[0.25em] text-[#829194]">Nuit Lumière · Eau de parfum</p>
            <h2 id="cart-title" className="mt-1 font-serif text-2xl sm:text-3xl">{step === 'cart' ? 'Ваша корзина' : 'Оформление'}</h2>
          </div>
          <button type="button" onClick={onClose} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#203337]/15 transition hover:bg-[#e9e0d4]" aria-label="Закрыть корзину"><X size={18} /></button>
        </div>

        {step === 'cart' ? (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-8 sm:py-6">
              {lines.length === 0 ? (
                <div className="flex h-full min-h-64 flex-col items-center justify-center text-center">
                  <ShoppingBag size={28} strokeWidth={1.2} className="text-[#829194]" />
                  <p className="mt-5 font-serif text-2xl">Корзина пока пуста</p>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-[#708083]">Выберите аромат из коллекции, чтобы продолжить.</p>
                  <button type="button" onClick={onClose} className="mt-6 text-[10px] uppercase tracking-[0.17em] text-[#6c817f] underline underline-offset-4">Вернуться к ароматам</button>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-5">
                  {lines.map(({ product, quantity, number }) => (
                    <article key={product.id} className="grid grid-cols-[76px_1fr] gap-3 border-b border-[#243538]/10 pb-4 sm:grid-cols-[92px_1fr] sm:gap-4 sm:pb-5">
                      <div className="h-[96px] overflow-hidden rounded-xl sm:h-[116px]"><BottleVisual product={product} number={number} /></div>
                      <div className="flex min-w-0 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0"><h3 className="font-serif text-lg leading-tight sm:text-xl">{product.name}</h3><p className="mt-1 text-[10px] text-[#78888b] sm:text-xs">50 мл · {product.category}</p><p className="mt-1 truncate text-[10px] text-[#9aa4a4]">{product.notes}</p></div>
                          <p className="whitespace-nowrap text-xs font-medium sm:text-sm">{formatPrice(product.price * quantity)}</p>
                        </div>
                        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
                          <div className="inline-flex h-9 items-center rounded-full border border-[#203337]/15">
                            <button type="button" onClick={() => onChangeQuantity(product.id, quantity - 1)} className="quantity-button" aria-label={`Уменьшить количество ${product.name}`}><Minus size={12} /></button>
                            <span className="min-w-7 text-center text-xs" aria-live="polite">{quantity}</span>
                            <button type="button" onClick={() => onChangeQuantity(product.id, quantity + 1)} className="quantity-button" aria-label={`Увеличить количество ${product.name}`}><Plus size={12} /></button>
                          </div>
                          <button type="button" onClick={() => onRemove(product.id)} className="inline-flex items-center gap-1 text-[10px] text-[#829194] transition-colors hover:text-[#9a5c4d] sm:text-xs"><Trash2 size={13} /> Удалить</button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
            {lines.length > 0 && (
              <div className="border-t border-[#243538]/10 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 sm:px-8 sm:py-6">
                <div className="mb-1 flex justify-between text-xs text-[#708083]"><span>{lines.length} аромат(а) · {itemCount} шт.</span><span className="text-[10px]">Демо-цены · EUR</span></div>
                <div className="mb-3 flex justify-between text-sm text-[#708083]"><span>Итого</span><span className="text-lg font-medium text-[#172528]">{formatPrice(total)}</span></div>
                <p className="mb-3 text-[9px] leading-4 text-[#849093] sm:mb-4 sm:text-[10px] sm:leading-5">Цены указаны в евро и приведены для демонстрации. Заказ не будет отправлен или оплачен.</p>
                <button type="button" onClick={onCheckout} className="w-full rounded-full bg-[#172528] px-5 py-3.5 text-[9px] uppercase tracking-[0.16em] text-[#f4eee5] transition hover:bg-[#33484a] sm:py-4 sm:text-[10px] sm:tracking-[0.19em]">Перейти к оформлению <ArrowRight size={14} className="ml-2 inline" /></button>
              </div>
            )}
          </>
        ) : (
          <form onSubmit={onSubmit} className="flex-1 overflow-y-auto px-5 py-5 sm:px-8 sm:py-6">
            <button type="button" onClick={onBack} className="mb-5 inline-flex items-center gap-2 text-xs text-[#718184] transition hover:text-[#172528]"><ArrowLeft size={13} /> Назад в корзину</button>
            <p className="mb-5 text-xs leading-5 text-[#718184] sm:text-sm sm:leading-6">Контактные данные нужны только для демонстрации формы. Они не отправляются и не сохраняются.</p>
            <div className="space-y-1">
              <label className="form-label">Имя<input className="checkout-input" name="name" type="text" autoComplete="name" required minLength={2} placeholder="Как к вам обращаться" /></label>
              <label className="form-label">Электронная почта<input className="checkout-input" name="email" type="email" autoComplete="email" required placeholder="name@example.com" /></label>
              <label className="form-label">Телефон<input className="checkout-input" name="phone" type="tel" autoComplete="tel" required minLength={7} placeholder="+33 6 12 34 56 78" /></label>
              <label className="form-label">Адрес доставки<input className="checkout-input" name="address" type="text" autoComplete="street-address" required minLength={5} placeholder="Город, улица, дом" /></label>
            </div>
            <div className="my-5 flex justify-between border-t border-[#243538]/10 pt-4 text-sm sm:my-6 sm:pt-5"><span className="text-[#708083]">Итого · {itemCount} шт.</span><strong>{formatPrice(total)}</strong></div>
            <div className="mb-5 rounded-xl bg-[#e9e2d8] p-3 text-[9px] leading-4 text-[#758386] sm:text-[10px] sm:leading-5">Демо-режим: нажатие ниже только покажет подтверждение в браузере. Сервер и платёжная система не подключены.</div>
            <button type="submit" className="w-full rounded-full bg-[#172528] px-5 py-3.5 text-[9px] uppercase tracking-[0.16em] text-[#f4eee5] transition hover:bg-[#33484a] sm:py-4 sm:text-[10px] sm:tracking-[0.19em]">Показать подтверждение <ArrowRight size={14} className="ml-2 inline" /></button>
          </form>
        )}
      </section>
    </div>
  );
}
