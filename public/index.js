

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const listener = new THREE.AudioListener();


// create an Audio source
const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
async function load(){
    const audioLoader = new THREE.AudioLoader();
    await audioLoader.load( 'sound/PorUnaCabeza', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setVolume(0.5);
    });

    
}

load()

// create an AudioAnalyser, passing in the sound and desired 

const analyser = new THREE.AudioAnalyser( sound , 128 );

// get the average frequency of the sound
const data = analyser.getFrequencyData();


document.getElementById("data").onclick = function() {show()};
function show() {
    console.log(data)
}

document.getElementById("play").onclick = function(){play()}
function play(){
    sound.play()
}

document.getElementById("pause").onclick = function(){pause()}
function pause(){
    sound.pause()
}