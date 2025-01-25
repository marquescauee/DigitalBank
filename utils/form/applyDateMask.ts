export const applyDateMask = (value: string, cursorPosition: number) => {
  const rawValue = value.replace(/\D/g, '')
  const maskedValue = rawValue
    .replace(/^(\d{2})(\d)/, '$1/$2')
    .replace(/^(\d{2}\/\d{2})(\d)/, '$1/$2')

  let newCursorPosition = cursorPosition
  const nonDigitsBeforeCursor = value
    .slice(0, cursorPosition)
    .replace(/\d/g, '').length
  const newNonDigitsBeforeCursor = maskedValue
    .slice(0, newCursorPosition)
    .replace(/\d/g, '').length

  newCursorPosition += newNonDigitsBeforeCursor - nonDigitsBeforeCursor

  return { maskedValue: maskedValue.substring(0, 10), newCursorPosition }
}
