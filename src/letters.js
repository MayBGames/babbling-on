const letters = { }

let ascii_code = 65

while (ascii_code < 65 + 26) {
  const letter = String.fromCharCode(ascii_code)
  
  letters[letter] = `/assets/letters/${letter}`

  ++ascii_code
}

export { letters }