function ok() {
    path = document.getElementById('mp-search-bar').value
    music = new Audio(path)
}

function play_music() {
    music = new Audio(path)
    document.getElementById('mp-status').innerHTML = path
    music.play()
}

function pause_music() {
    music.pause()
}
