import Head from 'next/head'
import Image from 'next/image'
import * as THREE from 'three';
import {useState , useEffect} from 'react'
import styles from '../styles/Cover.module.css'
import Visualizer from '../components/Visualizer'
import {BsPauseFill , BsFillPlayFill } from 'react-icons/bs'
import {GiPreviousButton} from 'react-icons/gi'
import {TiArrowShuffle} from 'react-icons/ti'
import {FiChevronDown} from 'react-icons/fi'



export default function Home() {
  const [isBrowser, setIsBrowser] = useState(false)
  const [isplaying, setIsplaying] = useState(false)
  const [isloaded, setIsLoaded] = useState(false)

  const [presound, setPreSound] = useState()
  const [prelistener, setPreListener] = useState()
  const [preanalyser, setPreAnalyser] = useState()
  const [frq, setFrq] = useState([])

  useEffect(() => {
    setIsBrowser(true)
    
  },[])



  if(isBrowser){

    const listener = isloaded ? prelistener : new THREE.AudioListener();
    const sound = isloaded ? presound : new THREE.Audio( listener );
    

    
    const load = () =>{
      const audioLoader = new THREE.AudioLoader();
      audioLoader.load( '/sound/PorUnaCabeza', function( buffer ) {
          sound.setBuffer( buffer );
          sound.setVolume(0.5);
          sound.play()
      });
      
      console.log(sound.buffer)
    }

    const analyser = () =>{
      const analyser = new THREE.AudioAnalyser( sound , 256 ) ;
      setPreAnalyser(analyser)
    }
  


    const pause = () =>{
      sound.pause()
      setIsplaying(false)
      console.log('paused')
    }
  
    const show = async () =>{
      if(isloaded){
        var canvas = document.getElementById("canvas");
        canvas.width = 300;
        canvas.height = 200;
        var bufferLength = 128;
        var ctx = canvas.getContext("2d");
        var WIDTH = canvas.width;
        var HEIGHT = canvas.height;

        var barWidth = (WIDTH / bufferLength) * 2.5;
        var barHeight;
        var x = 0;
        function renderFrame() {

          requestAnimationFrame(renderFrame);
    
          x = 0;
    
          var dataArray = preanalyser.getFrequencyData()
    
          ctx.fillStyle = "#313533";
          ctx.fillRect(0, 0, WIDTH, HEIGHT);

    
          for (var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];
            
            var r = barHeight + (25 * (i/bufferLength));
            var g = 250 * (i/bufferLength);
            var b = 50;
    
            ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
    
            x += barWidth + 1;
          }
        }
        renderFrame();
      } 
    }

    const play = async () =>{
      if(!isloaded){
        load()
        setIsplaying(true)
        setIsLoaded(true)
        analyser()
        setPreSound(sound)
        setPreListener(listener)
        // setPreAnalyser(analyser)
      }else{
        sound.play()
        setIsplaying(true)
        setPreSound(sound)
      }
      console.log('palying')
      
    }



    return (
      <div onLoad={show} className= {styles.container}>
          <div className={styles.box}> 
            <div className ={styles.cover}></div>

            {/* <Visualizer/> */}
            <canvas id="canvas" ></canvas>
            <div className= {styles.controls} >
                <button id="down" onClick={show}>
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
