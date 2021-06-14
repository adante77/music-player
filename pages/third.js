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
  
  const [isGradientSet, setIsGradientSet] = useState(false)
  

  useEffect(() => {
    setIsBrowser(true)

    if(document.getElementsByTagName('img').length !=0 &&  !isGradientSet){
      var image = document.getElementById('gradient')
      if( image.complete){

        Grade(document.querySelectorAll('.gradient-wrap'))
        setIsGradientSet(true)
      } 
      
    }
    

    const set = () =>{
      var wavesurfer = Wavesurfer[0].create({
      container: '#waveform',
      waveColor: 'white',
      progressColor: 'aquamarine',
      barRadius : 12,
      height:65,
      hideScrollbar : true,
      cursorWidth :0,
      normalize:true,
      pixelRatio:1,
      
      responsive : true,
      });
      wavesurfer.load('/sound/PorUnaCabeza' )
        wavesurfer.on('ready', function () {
        //console.log(JSON.stringify(wavesurfer.backend.getPeaks(512) ))
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
      wavesurfer.load('/sound/1')
    }


    const soundUpload = (e)=>{
      if( e.target.files[0] != null){
        setIsPlaying(false)
        wavesurfer.load(URL.createObjectURL(e.target.files[0]))
      }
    }


    return (
      <div  className= {`${style.container} gradient-wrap`} >

          <img id='gradient' src='https://res.cloudinary.com/dgpt2sh2g/image/upload/v1622635565/thumbnail_event1_26ffe9d150.jpg' crossOrigin="Anonymous"/>
          
          <div className={style.box}> 

            {/* Cover */}
            <div className ={style.cover}></div>

            {/* Visualizer */}
            <div id="waveform" className={style.wave}></div>

            {/* Controls */}
            <div className= {style.controls} >

                <div id="down" onClick={time} >
                  <label htmlFor="file-input">
                    <FiChevronDown/>
                  </label>
                  <input id='file-input' type='file' onChange={soundUpload}/>
                  
                </div>

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
