export default function currencyFormatter(val, currency = 'UZS') {
    return new Intl.NumberFormat('ru-Ru', {
        style : 'currency',
        currency
    }).format(val)
}