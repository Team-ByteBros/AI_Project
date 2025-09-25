import React, { useEffect, useState } from 'react';
import styles from './EnergyDashboard.module.css';


const TotalPredictionCard = ({data}) => {
//   const [data, setData] = useState({
//     "totalEnergyData": [
//         {
//             "Total": 0.801716268062592
//         },
//         {
//             "Total": 1.03707933425903
//         },
//         {
//             "Total": 1.34903597831726
//         },
//         {
//             "Total": 1.75177657604218
//         },
//         {
//             "Total": 2.13493371009827
//         },
//         {
//             "Total": 2.33181309700012
//         },
//         {
//             "Total": 2.19856333732605
//         },
//         {
//             "Total": 2.06680488586426
//         },
//         {
//             "Total": 2.27290272712708
//         },
//         {
//             "Total": 2.26408290863037
//         },
//         {
//             "Total": 1.94676399230957
//         },
//         {
//             "Total": 1.27245008945465
//         },
//         {
//             "Total": 0.848185122013092
//         },
//         {
//             "Total": 0.797490954399109
//         },
//         {
//             "Total": 0.832945466041565
//         },
//         {
//             "Total": 0.891349673271179
//         },
//         {
//             "Total": 0.971638441085815
//         },
//         {
//             "Total": 1.23687934875488
//         },
//         {
//             "Total": 0.914545059204102
//         },
//         {
//             "Total": 1.01091969013214
//         },
//         {
//             "Total": 1.10967040061951
//         },
//         {
//             "Total": 0.99183052778244
//         },
//         {
//             "Total": 1.11286616325378
//         },
//         {
//             "Total": 1.11262619495392
//         }
//     ],
//     "solarData": [
//         {
//             "Solar": 0.0388546958565712
//         },
//         {
//             "Solar": 0.223177894949913
//         },
//         {
//             "Solar": 0.493859946727753
//         },
//         {
//             "Solar": 0.924411594867706
//         },
//         {
//             "Solar": 1.06910312175751
//         },
//         {
//             "Solar": 1.37352216243744
//         },
//         {
//             "Solar": 1.43446433544159
//         },
//         {
//             "Solar": 1.68256568908691
//         },
//         {
//             "Solar": 1.51179432868958
//         },
//         {
//             "Solar": 1.38926684856415
//         },
//         {
//             "Solar": 1.04506015777588
//         },
//         {
//             "Solar": 0.558609962463379
//         },
//         {
//             "Solar": 0.0625779777765274
//         },
//         {
//             "Solar": 0
//         },
//         {
//             "Solar": 0
//         },
//         {
//             "Solar": 0.137871667742729
//         },
//         {
//             "Solar": 0.15939849615097
//         },
//         {
//             "Solar": 0.0153453862294555
//         },
//         {
//             "Solar": 0.0105076320469379
//         },
//         {
//             "Solar": 0
//         },
//         {
//             "Solar": 0.0101000154390931
//         },
//         {
//             "Solar": 0.00866511184722185
//         },
//         {
//             "Solar": 0.00809342879801989
//         },
//         {
//             "Solar": 0.103532195091248
//         }
//     ]
// })

const [currDt, setcurrDt] = useState(new Date());
const formatTime = currDt.toLocaleString('en-US', {hour : 'numeric'})

useEffect(()=>{
  const intervalId = setInterval(()=>{
    setcurrDt(new Date());
  }, 1000);

  return () => clearInterval(intervalId)
}, []);
let energy = 0;
let solar = 0;
data.totalEnergyData.map(i => energy += i.Total);
data.solarData.map(i => solar += i.Solar);

  
  return(
    <>
    <div className={`${styles.card} ${styles.total}`}>
    <div className={styles.cardHeader}>
      <span className={styles.icon}>⚡</span>
      <span>Today’s Energy Estimate</span>
    </div>

     <div className={`${styles.weather} ${styles.next}`}>
          
              <div style={{ 
                background: '#f3fff6', 
                padding: '0.8rem', 
                borderRadius: '0.7rem', 
                border: '1px solid #b6f7dd', 
                width: '95%',
                marginTop: '0.8rem'
              }}>
                <div style={{ 
                  fontWeight: '600', 
                  marginBottom: '0.5rem', 
                  color: '#107045',
                  textAlign: 'center'
                }}>
<span>{currDt.getDate()}/{currDt.getMonth()}/{currDt.getFullYear()}</span>

                </div>
                <div style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span>Total Energy Usage : {parseFloat(energy.toFixed(4))} kWh</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span>Solar Energy Usage : {parseFloat(solar.toFixed(4))} kWh</span>
                  </div>
                </div>
              </div>
            </div>
  </div>
    </>
  )
  
};

export default TotalPredictionCard;
