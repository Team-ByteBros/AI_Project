import React, { useState } from 'react';
import styles from './EnergyDashboard.module.css';

const HourPredictionCard = ({data}) => {

const energy = data.totalEnergy[0].Total;
const solar = data.solarEnergy[0].Solar;

const [currDt, setcurrDt] = useState(new Date());
const formatTime = currDt.toLocaleString('en-US', {hour : 'numeric'})
const hr = parseInt(formatTime.split("PM")) + 1


  return(
    <>
        <div className={`${styles.card} ${styles.solar}`}>
    <div className={styles.cardHeader}>
      <span className={styles.icon}>☀️</span>
      <span>Current Hour's Energy Estimate</span>
    </div>
    <div>

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
      <span>{formatTime.split("PM")} - {parseInt(formatTime.split("PM")) + 1} PM</span>
      
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


      {/* <span style={{ fontSize: '1.6rem', fontWeight: 700 }}>{formatTime.split("PM")} - {parseInt(formatTime.split("PM")) + 1} PM</span>
      <div className='styles.column'>
      <p style={{ fontSize: '1.6rem', fontWeight: 700 }}>Total Energy Usage : {energy} kWh</p>
      <p style={{ fontSize: '1.6rem', fontWeight: 700 }}>Solar Energy Usage : {solar} kWh</p>
    </div> */}
    </div>
  </div>
    </>
  )

};

export default  HourPredictionCard;
