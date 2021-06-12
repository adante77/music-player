import styles from '../styles/Visualizer.module.css'
import {useState , useEffect} from 'react'

export default function Visualizer() {



    const wave = (e) => {
        var path = "M0 0 L 0 100 "
        var j = -1
        var total_width = 0
        while(total_width <1600){
         var q_width =(Math.random() * 80 + 30)
         if (q_width < 60 )
             var q_height = j * (Math.random() * q_width/2 +10)
         else
              var q_height = j * (Math.random() * 60 + 50)
         var t = Math.random() * 5 + 2
   
         path += "q" + " " + (q_width/2 +t) + " " + q_height +  " " +q_width + " " + "0" + " "
   
         j = j * -1
         total_width+=q_width
        }
        path+="l 0 -100 Z"
       
       return path
    }

    useEffect(() => {
        document.getElementById("sd").setAttribute("d" , wave() )
        document.getElementById("bd").setAttribute("d" , wave() )
    },[])
    
    
    
    

    return (
        <div id="visualizer" className={styles.container} > 
            <div id="overlay"className={styles.overlay}>
                <svg viewBox="0 0 1200 150">
                    <path id="sd" />
                </svg>
    
                <svg viewBox="0 0 1200 150" >
                    <path id="bd"  />
                </svg>
             </div>
        </div>
    )
}
