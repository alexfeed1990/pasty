const url = window.location
const hash = url.pathname.substring(1);
const pastename = hash.substring(32);
const rawurl = window.location.href + '/raw'
const decrypted = decodeURI(pastename);

window.addEventListener('DOMContentLoaded', (event) => {
    document.title = 'Pasty - ' + decrypted
    document.getElementById('title').innerHTML = decrypted

    document.getElementById('rawb').addEventListener('click', (event) => {
      window.location.href = rawurl
    })

    fetch(rawurl).then ((res) => {
        res.text().then((content) => {
            document.getElementById('content').textContent = content
        })
    })
});