const nf = new Intl.NumberFormat('ru-RU', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

export const formatAmount = (amount?: number | null) => {
  if (typeof amount !== 'number') {
    return '-'
  }
  const zeroAmount = amount.toString().length - 1

  if (zeroAmount >= 9) {
    return `${nf.format(amount / 1e9)} млрд`
  }

  if (zeroAmount >= 6) {
    return `${nf.format(amount / 1e6)} млн`
  }
  if (zeroAmount >= 3) {
    return `${nf.format(amount / 1e3)} тыс`
  }

  return nf.format(amount)
}
