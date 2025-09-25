import React from 'react';
import styles from './EnergyDashboard.module.css';

const BatteryCard = () => (
  <div className={`${styles.card} ${styles.battery}`}>
    <div className={styles.cardHeader}>
      <span className={styles.icon}>🔋</span>
      <span>Battery Usage</span>
    </div>
    <div className={styles.batteryLevel}>
      <span>80%</span>
      <div className={styles.progressBarOuter}>
        <div className={styles.progressBarInner} style={{ width: '80%' }}></div>
      </div>
      <span className={styles.batteryStatus}>Charging - 2h left</span>
    </div>
  </div>
);

export default BatteryCard;
