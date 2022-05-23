export const ATC_COLOR = {
  primary: '#063970',
  primaryDark: '#020F1C',
  secondary: '#FF4352',
  white: '#FFFFFF',
}

export const getRandomColor = () => {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export const getInitials = (name) => {
  let initials
  const nameSplit = name.split(' ')
  const nameLength = nameSplit.length
  if (nameLength > 1) {
    initials =
      nameSplit[0].substring(0, 1) + nameSplit[nameLength - 1].substring(0, 1)
  } else if (nameLength === 1) {
    initials = nameSplit[0].substring(0, 1)
  } else return

  return initials.toUpperCase()
}
