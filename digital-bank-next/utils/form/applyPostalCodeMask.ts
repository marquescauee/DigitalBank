export const applyCepMask = (value: string, cursorPosition: number) => {
  const rawValue = value.replace(/\D/g, '')
  const maskedValue = rawValue.replace(/^(\d{5})(\d)/, '$1-$2')

  let newCursorPosition = cursorPosition

  if (cursorPosition > 5 && rawValue.length > 5) {
    newCursorPosition++
  }

  return { maskedValue: maskedValue.substring(0, 9), newCursorPosition }
}
