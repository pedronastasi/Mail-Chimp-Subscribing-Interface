const e = document.getElementsByClassName('year')
console.log(e)
const year = new Date().getFullYear()
e[0].innerHTML += " " + year