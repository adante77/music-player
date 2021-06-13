import {useState , useEffect} from 'react'
import styles from '../styles/Cover.module.css'
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


  useEffect(() => {
    setIsBrowser(true)

    const set = () =>{
      var wavesurfer = Wavesurfer[0].create({
      container: '#waveform',
      waveColor: 'white',
      progressColor: 'aquamarine',
      barRadius : 10,
      hideScrollbar : true,
      cursorWidth :0,
      barHeight: 1.4 ,
      barMinHeight:1.4
      
      });
      wavesurfer.load('/sound/PorUnaCabeza');
      setwavesurfer(wavesurfer)
    }
    
    if(isWaveCreate){
      console.log(44)
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
      wavesurfer.pause()
    }


    return (
      <div  className= {styles.container} >
          <div className={styles.box}> 
            {/* Cover */}
            <div className ={styles.cover}></div>

            <div id="waveform" className={style.wave}>
              
            </div>

            {/* Controls */}
            <div className= {styles.controls} >

                <button id="down" onClick={time} >
                  <FiChevronDown/>
                </button>

                <button id="prev"  > 
                  <GiPreviousButton />
                </button>

                <button id="play" onClick={playpause} > 
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
