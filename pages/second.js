import {useState , useEffect} from 'react'
import style from '../styles/Second.module.css'
import Grade from 'grade-js'
import {BsPauseFill , BsFillPlayFill } from 'react-icons/bs'
import {GiPreviousButton} from 'react-icons/gi'
import {TiArrowShuffle} from 'react-icons/ti'
import {FiChevronDown} from 'react-icons/fi'




export default function second() {

  const [isBrowser, setIsBrowser] = useState(false)

  const [Wavesurfer] = useState([])
  const [isWaveCreate, setIsWaveCreate] = useState(false)
  const [wavesurfer, setwavesurfer] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  

  useEffect(() => {
    setIsBrowser(true)

    if(document.getElementsByTagName('img').length !=0){
      console.log(document.getElementsByTagName('img').length )
      Grade(document.querySelectorAll('.gradient-wrap'))
    }
    

    const set = () =>{
      var wavesurfer = Wavesurfer[0].create({
      container: '#waveform',
      waveColor: 'white',
      progressColor: 'aquamarine',
      barRadius : 10,
      hideScrollbar : true,
      cursorWidth :0,
      barHeight: 1 ,
      barMinHeight:1,
      responsive : true
      });
      wavesurfer.load('/sound/PorUnaCabeza');
      wavesurfer.on('ready', function () {
        setIsLoaded(true)
    });

      setwavesurfer(wavesurfer)
    }
    
    if(isWaveCreate){
      set()
      setIsWaveCreate(false)
    }

  })



  if(isBrowser){
     

    if(Wavesurfer.length === 0){
      var temp =  require('wavesurfer.js')
      Wavesurfer.push(temp)
      setIsWaveCreate(true)
    }
    


    const playpause =() =>{
      if(!isPlaying){
        setIsPlaying(true)
      }else{
        setIsPlaying(false)
      }
      wavesurfer.playPause();
    }

    const time =()=>{
      console.log(wavesurfer.getCurrentTime())
    }

    const pause = ()=>{
      wavesurfer.load('/sound/1');
    }


    return (
      <div  className= {`${style.container} gradient-wrap`} >

          <img src='/images/1.jpg' crossorigin="Anonymous"/>
          
          <div className={style.box}> 

            {/* Cover */}
            <div className ={style.cover}></div>

            {/* Visualizer */}
            <div id="waveform" className={style.wave}></div>

            {/* Controls */}
            <div className= {style.controls} >

                <button id="down" onClick={time} >
                  <FiChevronDown/>
                </button>

                <button id="prev"  > 
                  <GiPreviousButton />
                </button>

                <button id="play" onClick={isLoaded ? playpause : null} > 
                {isPlaying  ?  <BsPauseFill /> : <BsFillPlayFill/>  }
                </button>

                <button id="next" onClick={pause}> 
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
