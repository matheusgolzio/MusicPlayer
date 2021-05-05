//armazena as referencias do HTML em var
const form = document.querySelector('#form')
const searchInput = document.querySelector('#search')
const songsContainer = document.querySelector('#songs-container')
const prevAndNextContainer = document.querySelector('#prev-and-next-container')

const apiUrl = `https://api.lyrics.ovh`


const fetchData = async url => {
    const response = await fetch(url)
    return await response.json()
}

const getMoreSongs = async url => {
    const data = await fetchData(`https://cors-anywhere.herokuapp.com/${url}`)
    insertSongsIntoPage(data)
}

const insertNextAndPrevButtons = ({ prev, next }) => { 
    prevAndNextContainer.innerHTML = `
    ${prev ? `<button class="btn-prev" onclick="getMoreSongs('${prev}')">&#8249;</button>` : ''}
    ${next ? `<button class="btn-next" onclick="getMoreSongs('${next}')">&#8250;</button>` : ''}
`
}


const insertSongsIntoPage = ({ data, prev, next }) => {
    songsContainer.innerHTML = data.map(({ artist: { name }, title, preview }) => `
        <li class="song">
            <audio controls style="display: none;" class="audio">
                <source src="${preview}" />
            </audio>
            <span class="song-artist"><strong>${name}</strong> - ${title}</span>
            <button class="btn" data-artist="${name}" data-song-title="${title}">Letra</button>
        </li>
    `).join('')

    // botão prev e next
    if (prev || next) {
        insertNextAndPrevButtons({ prev, next })
        return
    }

    prevAndNextContainer.innerHTML = ''
}


const fetchSongs = async term => {
    const data = await fetchData(`${apiUrl}/suggest/${term}`)
    console.log(data) 
    insertSongsIntoPage(data)
}

const handleFormSubmit = event => {
    event.preventDefault()

    const searchTerm = searchInput.value.trim()
   
    searchInput.value = '' 
    searchInput.focus() 

    if (!searchTerm) {
        songsContainer.innerHTML = `<li class="warning-message">Por favor, digite um termo válido</li>`
        return 
    }
    fetchSongs(searchTerm)
}

form.addEventListener('submit', handleFormSubmit)

const insertLyricsIntoPage = ({ lyrics, artist, songTitle}) => {
    songsContainer.innerHTML = `
        <li class="lyrics-container">
            <h2><strong>${songTitle}</strong> - ${artist}</h2>
            <p class="lyrics">${lyrics}</p>
        </li>
    `
}

const fetchLyrics = async (artist, songTitle) => {
    const data = await fetchData(`${apiUrl}/v1/${artist}/${songTitle}`)
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>')

    
    insertLyricsIntoPage({ lyrics, artist, songTitle})
}

const handleSongsContainerClick = event => {
    const clickedElement = event.target

    if (clickedElement.tagName === 'BUTTON') {
        const artist = clickedElement.getAttribute('data-artist') //artist; "led zeppelin"
        const songTitle = clickedElement.getAttribute('data-song-title')
        // const preview = clickedElement.getAttribute('audio')

        // remover botão prev e next quando a letra da música for clicada
        prevAndNextContainer.innerHTML = ''

        fetchLyrics(artist, songTitle)
    }
}

//evento de click
songsContainer.addEventListener('click', handleSongsContainerClick)