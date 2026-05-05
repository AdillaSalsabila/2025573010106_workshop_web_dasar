const judul = document.querySelector('.judul')
const btn = document.querySelector('#btn-klik')


const paragraf = document.querySelectorAll('.deskripsi')
const semuaLi = document.querySelectorAll('li')


const list = document.getElementById('list-buah')


console.log('Judul:', judul)
console.log('Jumlah paragraf:',paragraf.length)
console.log('List node:', list)


const favorit = document.querySelector('.favorit')
console.log('Parent:', favorit.parentElement.id)
console.log('Sibling sebelum:',favorit.previousElementSibling?.textContent)