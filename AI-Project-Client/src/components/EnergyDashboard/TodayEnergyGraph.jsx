import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styles from './EnergyDashboard.module.css';

const TodayEnergyGraph = ()=>{

      const [data, setData] = useState({
    "totalEnergyData": [
        {
            "Total": 0.801716268062592
        },
        {
            "Total": 1.03707933425903
        },
        {
            "Total": 1.34903597831726
        },
        {
            "Total": 1.75177657604218
        },
        {
            "Total": 2.13493371009827
        },
        {
            "Total": 2.33181309700012
        },
        {
            "Total": 2.19856333732605
        },
        {
            "Total": 2.06680488586426
        },
        {
            "Total": 2.27290272712708
        },
        {
            "Total": 2.26408290863037
        },
        {
            "Total": 1.94676399230957
        },
        {
            "Total": 1.27245008945465
        },
        {
            "Total": 0.848185122013092
        },
        {
            "Total": 0.797490954399109
        },
        {
            "Total": 0.832945466041565
        },
        {
            "Total": 0.891349673271179
        },
        {
            "Total": 0.971638441085815
        },
        {
            "Total": 1.23687934875488
        },
        {
            "Total": 0.914545059204102
        },
        {
            "Total": 1.01091969013214
        },
        {
            "Total": 1.10967040061951
        },
        {
            "Total": 0.99183052778244
        },
        {
            "Total": 1.11286616325378
        },
        {
            "Total": 1.11262619495392
        }
    ],
    "solarData": [
        {
            "Solar": 0.0388546958565712
        },
        {
            "Solar": 0.223177894949913
        },
        {
            "Solar": 0.493859946727753
        },
        {
            "Solar": 0.924411594867706
        },
        {
            "Solar": 1.06910312175751
        },
        {
            "Solar": 1.37352216243744
        },
        {
            "Solar": 1.43446433544159
        },
        {
            "Solar": 1.68256568908691
        },
        {
            "Solar": 1.51179432868958
        },
        {
            "Solar": 1.38926684856415
        },
        {
            "Solar": 1.04506015777588
        },
        {
            "Solar": 0.558609962463379
        },
        {
            "Solar": 0.0625779777765274
        },
        {
            "Solar": 0
        },
        {
            "Solar": 0
        },
        {
            "Solar": 0.137871667742729
        },
        {
            "Solar": 0.15939849615097
        },
        {
            "Solar": 0.0153453862294555
        },
        {
            "Solar": 0.0105076320469379
        },
        {
            "Solar": 0
        },
        {
            "Solar": 0.0101000154390931
        },
        {
            "Solar": 0.00866511184722185
        },
        {
            "Solar": 0.00809342879801989
        },
        {
            "Solar": 0.103532195091248
        }
    ]
})
  const processChartData = () => {
    const labels = [];
    const hourTotals = [];

    for(let i = 0; i < 24; i++) labels.push(i);
    data.totalEnergyData.map(i => hourTotals.push(i.Total))

    return { labels, hourTotals };
   }

   const { labels, hourTotals } = processChartData();

const chartData = {
    labels,
    datasets: [
      {
        label: 'Total Energy Consumption (kWh)',
        data: hourTotals,
        borderColor: '#129b5e',
        backgroundColor: 'rgba(18, 155, 94, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#129b5e',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#0f8a54',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 3,
      }
    ]
  };

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: '#129b5e',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (context) => `${context[0].label}`,
          label: (context) => `Total Energy: ${context.raw} kWh`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#666',
          font: {
            size: 12
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          borderDash: [2, 2]
        },
        ticks: {
          color: '#666',
          font: {
            size: 12
          },
          callback: function(value) {
            return value + ' kWh';
          }
        }
      }
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  };



    return(
        <>

        <div className={`${styles.card}  ${styles.today_energy}`}>
              <div className={styles.cardHeader}>
                <span className={styles.icon}>📈</span>
                Today's Hourly Energy Predictions
              </div>
              
              {/* Full Width Container */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                width: '100%',
                alignItems: 'stretch'
              }}>
                    <div style={{ 
                              width: '100%',
                              height: '350px',
                              background: '#ffffff',
                              borderRadius: '0.8rem',
                              padding: '0.5rem',
                              border: '1px solid #e8f5e8',
                              position: 'relative'
                            }}>
                              <Line data={chartData} options={chartOptions} />
                            </div>
              </div>
              </div>
        </>
    )
}

const TodaySolarGraph = ()=>{

      const [data, setData] = useState({
    "totalEnergyData": [
        {
            "Total": 0.801716268062592
        },
        {
            "Total": 1.03707933425903
        },
        {
            "Total": 1.34903597831726
        },
        {
            "Total": 1.75177657604218
        },
        {
            "Total": 2.13493371009827
        },
        {
            "Total": 2.33181309700012
        },
        {
            "Total": 2.19856333732605
        },
        {
            "Total": 2.06680488586426
        },
        {
            "Total": 2.27290272712708
        },
        {
            "Total": 2.26408290863037
        },
        {
            "Total": 1.94676399230957
        },
        {
            "Total": 1.27245008945465
        },
        {
            "Total": 0.848185122013092
        },
        {
            "Total": 0.797490954399109
        },
        {
            "Total": 0.832945466041565
        },
        {
            "Total": 0.891349673271179
        },
        {
            "Total": 0.971638441085815
        },
        {
            "Total": 1.23687934875488
        },
        {
            "Total": 0.914545059204102
        },
        {
            "Total": 1.01091969013214
        },
        {
            "Total": 1.10967040061951
        },
        {
            "Total": 0.99183052778244
        },
        {
            "Total": 1.11286616325378
        },
        {
            "Total": 1.11262619495392
        }
    ],
    "solarData": [
        {
            "Solar": 0.0388546958565712
        },
        {
            "Solar": 0.223177894949913
        },
        {
            "Solar": 0.493859946727753
        },
        {
            "Solar": 0.924411594867706
        },
        {
            "Solar": 1.06910312175751
        },
        {
            "Solar": 1.37352216243744
        },
        {
            "Solar": 1.43446433544159
        },
        {
            "Solar": 1.68256568908691
        },
        {
            "Solar": 1.51179432868958
        },
        {
            "Solar": 1.38926684856415
        },
        {
            "Solar": 1.04506015777588
        },
        {
            "Solar": 0.558609962463379
        },
        {
            "Solar": 0.0625779777765274
        },
        {
            "Solar": 0
        },
        {
            "Solar": 0
        },
        {
            "Solar": 0.137871667742729
        },
        {
            "Solar": 0.15939849615097
        },
        {
            "Solar": 0.0153453862294555
        },
        {
            "Solar": 0.0105076320469379
        },
        {
            "Solar": 0
        },
        {
            "Solar": 0.0101000154390931
        },
        {
            "Solar": 0.00866511184722185
        },
        {
            "Solar": 0.00809342879801989
        },
        {
            "Solar": 0.103532195091248
        }
    ]
})
  const processChartData = () => {
    const labels = [];
    const hourTotals = [];

    for(let i = 0; i < 24; i++) labels.push(i);
    data.solarData.map(i => hourTotals.push(i.Solar))

    return { labels, hourTotals };
   }

   const { labels, hourTotals } = processChartData();

const chartData = {
    labels,
    datasets: [
      {
        label: 'Solar Energy Consumption (kWh)',
        data: hourTotals,
        borderColor: '#129b5e',
        backgroundColor: 'rgba(18, 155, 94, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#129b5e',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#0f8a54',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 3,
      }
    ]
  };

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: '#129b5e',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (context) => `${context[0].label}`,
          label: (context) => `Solar Energy: ${context.raw} kWh`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#666',
          font: {
            size: 12
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          borderDash: [2, 2]
        },
        ticks: {
          color: '#666',
          font: {
            size: 12
          },
          callback: function(value) {
            return value + ' kWh';
          }
        }
      }
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  };



    return(
        <>

        <div className={`${styles.card} ${styles.today_solar}`}>
              <div className={styles.cardHeader}>
                <span className={styles.icon}>🌞</span>
                Today's Hourly Solar Predictions
              </div>
              
              {/* Full Width Container */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                width: '100%',
                alignItems: 'stretch'
              }}>
                    <div style={{ 
                              width: '100%',
                              height: '350px',
                              background: '#ffffff',
                              borderRadius: '0.8rem',
                              padding: '0.5rem',
                              border: '1px solid #e8f5e8',
                              position: 'relative'
                            }}>
                              <Line data={chartData} options={chartOptions} />
                            </div>
              </div>
              </div>
        </>
    )
}


export {TodayEnergyGraph, TodaySolarGraph};