



export const handleKeyDown = (event: any) => {
    // Check if the space key is pressed and it's the first character
    if (event.key === " " && event.target.selectionStart === 0) {
      event.preventDefault()
    }
}

export const handleKeyContactDown = (e: any) => {
  // Check if the space key is pressed and it's the first character
  if (!((e.key >= '0' && e.key <= '9') || e.key === 'Backspace' || e.key === '+' || e.key === '-')) {
    e.preventDefault()
  }
}
