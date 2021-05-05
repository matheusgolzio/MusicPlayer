var path = document.getElementById("path").value
var music = new Audio(path)

function play_music() {
    music.play();
    document.getElementById("status").innerHTML = path
}

function pause_music() {
    music.pause()
}

function stop_music() {
    music.stop()
}
