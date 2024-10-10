// カンマを付与する
export function formatNumberWithCommas(value: number | string): string {
  const numberValue = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(numberValue)) {
    return value.toString()
  }

  return numberValue.toLocaleString()
}
