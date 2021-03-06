import Head from 'next/head'
import Image from 'next/image'
import * as THREE from 'three';
import {useState , useEffect} from 'react'
import styles from '../styles/Cover.module.css'
import Visualizer from '../components/Visualizer'
import Grade from 'grade-js'
import {BsPauseFill , BsFillPlayFill } from 'react-icons/bs'
import {GiPreviousButton} from 'react-icons/gi'
import {TiArrowShuffle} from 'react-icons/ti'
import {FiChevronDown} from 'react-icons/fi'


const delay = require('delay');


export default function Home() {
  const [isBrowser, setIsBrowser] = useState(false)
  const [isplaying, setIsplaying] = useState(false)
  const [isloaded, setIsLoaded] = useState(false)

  const [presound, setPreSound] = useState()
  const [prelistener, setPreListener] = useState()
  const [preanalyser, setPreAnalyser] = useState()


  const [startTime, setStartTime] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)


  useEffect(() => {
    setIsBrowser(true)
    if(isplaying){
      var s = presound.getOutput().context.currentTime
      setStartTime(s)
      console.log(s)
    }
  },[isplaying])



  if(isBrowser){
    
    const listener = isloaded ? prelistener : new THREE.AudioListener();
    const sound = isloaded ? presound : new THREE.Audio( listener );
    
    

    
    const load = () =>{
      const audioLoader = new THREE.AudioLoader();
      audioLoader.load( '/sound/PorUnaCabeza', function( buffer ) {
          sound.setBuffer( buffer );
          sound.setVolume(0.5); 
          sound.play()
          setIsLoaded(true)
          setPreSound(sound)
          analyser()
      });
    }


    const analyser = () =>{
      const analyser = new THREE.AudioAnalyser( sound , 256 ) ;
      progress()
      } 


    const pause = () =>{
      sound.pause()
      setIsplaying(false)
      console.log('paused')
    }
  

    const play = async () =>{
      setIsplaying(true)
      if(!isloaded ){
        load()
      }else{
        sound.play()
        progress()
      }
      setPreSound(sound)
      console.log('palying')
    }

    
    const progress = ()=>{
       var overlay = document.getElementById("overlay");
        function renderFrame() {

          var frameId = requestAnimationFrame(renderFrame);
          
          var a = ( (sound.getOutput().context.currentTime - startTime) / 133 ) * 100
          overlay.style.width =  a + "%"

          
          if(!sound.isPlaying){
            cancelAnimationFrame(frameId)
            // overlay.style.width =  100 + "%"
            setIsplaying(false)
            pause()
            return
          }
          
        }
        renderFrame();
    }



    return (
      <div  className= {styles.container} >
          <div className={styles.box}> 
            {/* Cover */}
            <div className ={styles.cover}></div>

            <Visualizer/>
            {/* <canvas id="canvas" ></canvas> */}

            {/* Controls */}
            <div className= {styles.controls} >

                <button id="down"  >
                  <FiChevronDown/>
                </button>

                <button id="prev"  > 
                  <GiPreviousButton />
                </button>

                <button id="play" onClick={isplaying ? pause : play}> 
                {isplaying ?  <BsPauseFill /> : <BsFillPlayFill/>  }
                </button>

                <button id="next" > 
                 <GiPreviousButton/>
                </button>


                <button id="shuffle" > 
                  <TiArrowShuffle/>
                </button>
            </div>
          </div>
          
      </div>
    )
  }else{
      return null;
  }


  
}
