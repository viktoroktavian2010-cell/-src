const euroFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 2,
});

export const formatPrice = (amount: number) => euroFormatter.format(amount);
