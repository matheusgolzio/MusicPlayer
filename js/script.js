function ok() {
    path = document.getElementById('source').value
    music = new Audio(path)
}

function play_music() {
    music = new Audio(path)
    document.getElementById('status').innerHTML = path
    music.play()
}

function pause_music() {
    music.pause()
}
