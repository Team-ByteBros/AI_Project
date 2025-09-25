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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SevenDayEnergyCard = () => {
  const [energyData] = useState({
    "grouped": {
      "2025-09-18": [
        { "hour": 0, "total": 0.45 }, { "hour": 1, "total": 0.52 }, { "hour": 2, "total": 0.68 },
        { "hour": 3, "total": 0.89 }, { "hour": 4, "total": 1.12 }, { "hour": 5, "total": 1.45 },
        { "hour": 6, "total": 1.78 }, { "hour": 7, "total": 2.01 }, { "hour": 8, "total": 2.15 },
        { "hour": 9, "total": 2.08 }, { "hour": 10, "total": 1.89 }, { "hour": 11, "total": 1.67 },
        { "hour": 12, "total": 1.23 }, { "hour": 13, "total": 0.98 }, { "hour": 14, "total": 0.87 },
        { "hour": 15, "total": 0.76 }, { "hour": 16, "total": 0.69 }, { "hour": 17, "total": 0.73 },
        { "hour": 18, "total": 0.81 }, { "hour": 19, "total": 0.88 }, { "hour": 20, "total": 0.92 },
        { "hour": 21, "total": 0.86 }, { "hour": 22, "total": 0.74 }, { "hour": 23, "total": 0.61 }
      ],
      "2025-09-19": [
        { "hour": 0, "total": 0.48 }, { "hour": 1, "total": 0.55 }, { "hour": 2, "total": 0.71 },
        { "hour": 3, "total": 0.92 }, { "hour": 4, "total": 1.18 }, { "hour": 5, "total": 1.52 },
        { "hour": 6, "total": 1.85 }, { "hour": 7, "total": 2.08 }, { "hour": 8, "total": 2.22 },
        { "hour": 9, "total": 2.15 }, { "hour": 10, "total": 1.96 }, { "hour": 11, "total": 1.74 },
        { "hour": 12, "total": 1.30 }, { "hour": 13, "total": 1.05 }, { "hour": 14, "total": 0.94 },
        { "hour": 15, "total": 0.83 }, { "hour": 16, "total": 0.76 }, { "hour": 17, "total": 0.80 },
        { "hour": 18, "total": 0.88 }, { "hour": 19, "total": 0.95 }, { "hour": 20, "total": 0.99 },
        { "hour": 21, "total": 0.93 }, { "hour": 22, "total": 0.81 }, { "hour": 23, "total": 0.68 }
      ],
      "2025-09-20": [
        { "hour": 0, "total": 0.51 }, { "hour": 1, "total": 0.58 }, { "hour": 2, "total": 0.74 },
        { "hour": 3, "total": 0.95 }, { "hour": 4, "total": 1.21 }, { "hour": 5, "total": 1.55 },
        { "hour": 6, "total": 1.88 }, { "hour": 7, "total": 2.11 }, { "hour": 8, "total": 2.25 },
        { "hour": 9, "total": 2.18 }, { "hour": 10, "total": 1.99 }, { "hour": 11, "total": 1.77 },
        { "hour": 12, "total": 1.33 }, { "hour": 13, "total": 1.08 }, { "hour": 14, "total": 0.97 },
        { "hour": 15, "total": 0.86 }, { "hour": 16, "total": 0.79 }, { "hour": 17, "total": 0.83 },
        { "hour": 18, "total": 0.91 }, { "hour": 19, "total": 0.98 }, { "hour": 20, "total": 1.02 },
        { "hour": 21, "total": 0.96 }, { "hour": 22, "total": 0.84 }, { "hour": 23, "total": 0.71 }
      ],
      "2025-09-21": [
        { "hour": 0, "total": 0.49 }, { "hour": 1, "total": 0.56 }, { "hour": 2, "total": 0.72 },
        { "hour": 3, "total": 0.93 }, { "hour": 4, "total": 1.19 }, { "hour": 5, "total": 1.53 },
        { "hour": 6, "total": 1.86 }, { "hour": 7, "total": 2.09 }, { "hour": 8, "total": 2.23 },
        { "hour": 9, "total": 2.16 }, { "hour": 10, "total": 1.97 }, { "hour": 11, "total": 1.75 },
        { "hour": 12, "total": 1.31 }, { "hour": 13, "total": 1.06 }, { "hour": 14, "total": 0.95 },
        { "hour": 15, "total": 0.84 }, { "hour": 16, "total": 0.77 }, { "hour": 17, "total": 0.81 },
        { "hour": 18, "total": 0.89 }, { "hour": 19, "total": 0.96 }, { "hour": 20, "total": 1.00 },
        { "hour": 21, "total": 0.94 }, { "hour": 22, "total": 0.82 }, { "hour": 23, "total": 0.69 }
      ],
      "2025-09-22": [
        { "hour": 0, "total": 0.52 }, { "hour": 1, "total": 0.59 }, { "hour": 2, "total": 0.75 },
        { "hour": 3, "total": 0.96 }, { "hour": 4, "total": 1.22 }, { "hour": 5, "total": 1.56 },
        { "hour": 6, "total": 1.89 }, { "hour": 7, "total": 2.12 }, { "hour": 8, "total": 2.26 },
        { "hour": 9, "total": 2.19 }, { "hour": 10, "total": 2.00 }, { "hour": 11, "total": 1.78 },
        { "hour": 12, "total": 1.34 }, { "hour": 13, "total": 1.09 }, { "hour": 14, "total": 0.98 },
        { "hour": 15, "total": 0.87 }, { "hour": 16, "total": 0.80 }, { "hour": 17, "total": 0.84 },
        { "hour": 18, "total": 0.92 }, { "hour": 19, "total": 0.99 }, { "hour": 20, "total": 1.03 },
        { "hour": 21, "total": 0.97 }, { "hour": 22, "total": 0.85 }, { "hour": 23, "total": 0.72 }
      ],
      "2025-09-23": [
        { "hour": 0, "total": 0.55253678560257 }, { "hour": 1, "total": 0.663592338562012 },
        { "hour": 2, "total": 0.957974195480347 }, { "hour": 3, "total": 1.43101799488068 },
        { "hour": 4, "total": 1.7294716835022 }, { "hour": 5, "total": 2.0151698589325 },
        { "hour": 6, "total": 2.22549796104431 }, { "hour": 7, "total": 2.29269623756409 },
        { "hour": 8, "total": 2.19781470298767 }, { "hour": 9, "total": 1.73265278339386 },
        { "hour": 10, "total": 1.23478126525879 }, { "hour": 11, "total": 1.23897969722748 },
        { "hour": 12, "total": 0.787644743919373 }, { "hour": 13, "total": 0.763430058956146 },
        { "hour": 14, "total": 0.87967449426651 }, { "hour": 15, "total": 1.01535081863403 },
        { "hour": 16, "total": 0.671861052513123 }, { "hour": 17, "total": 0.975980877876282 },
        { "hour": 18, "total": 0.887835741043091 }, { "hour": 19, "total": 0.695145428180695 },
        { "hour": 20, "total": 0.855782568454742 }, { "hour": 21, "total": 0.748191833496094 },
        { "hour": 22, "total": 0.85302209854126 }, { "hour": 23, "total": 0.823720753192902 }
      ],
      "2025-09-24": [
        { "hour": 0, "total": 0.801716268062592 }, { "hour": 1, "total": 1.03707933425903 },
        { "hour": 2, "total": 1.34903597831726 }, { "hour": 3, "total": 1.75177657604218 },
        { "hour": 4, "total": 2.13493371009827 }, { "hour": 5, "total": 2.33181309700012 },
        { "hour": 6, "total": 2.19856333732605 }, { "hour": 7, "total": 2.06680488586426 },
        { "hour": 8, "total": 2.27290272712708 }, { "hour": 9, "total": 2.26408290863037 },
        { "hour": 10, "total": 1.94676399230957 }, { "hour": 11, "total": 1.27245008945465 },
        { "hour": 12, "total": 0.848185122013092 }, { "hour": 13, "total": 0.797490954399109 },
        { "hour": 14, "total": 0.832945466041565 }, { "hour": 15, "total": 0.891349673271179 },
        { "hour": 16, "total": 0.971638441085815 }
      ]
    }
  });

  const processChartData = () => {
    const labels = [];
    const dailyTotals = [];
    
    // Get sorted dates for last 7 days
    const dates = Object.keys(energyData.grouped).sort();
    
    dates.forEach(date => {
      // Calculate daily total by summing all hourly values
      const dayTotal = energyData.grouped[date].reduce((sum, hour) => sum + hour.total, 0);
      
      // Format date for display
      const dateObj = new Date(date);
      const formattedDate = dateObj.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
      
      labels.push(formattedDate);
      dailyTotals.push(parseFloat(dayTotal.toFixed(2)));
    });
    
    return { labels, dailyTotals };
  };

  const { labels, dailyTotals } = processChartData();

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Todays Hourly Energy Consumption (kWh)',
        data: dailyTotals,
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

  // Calculate statistics
  const avgConsumption = (dailyTotals.reduce((sum, val) => sum + val, 0) / dailyTotals.length).toFixed(2);
  const maxConsumption = Math.max(...dailyTotals).toFixed(2);
  const minConsumption = Math.min(...dailyTotals).toFixed(2);

  return (
    <div className={`${styles.card} ${styles.energy_chart}`}>
      <div className={styles.cardHeader}>
        <span className={styles.icon}>📈</span>
        Last 7-Day Energy Consumption
      </div>
      
      {/* Full Width Container */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        width: '100%',
        alignItems: 'stretch'
      }}>
        {/* Statistics Summary */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '1.5rem',
          background: '#f8fdf9',
          padding: '1rem',
          borderRadius: '0.8rem',
          border: '1px solid #e8f5e8'
        }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '700', color: '#129b5e' }}>{avgConsumption}</div>
            <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.2rem' }}>Avg kWh/day</div>
          </div>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d32f2f' }}>{maxConsumption}</div>
            <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.2rem' }}>Max kWh/day</div>
          </div>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1976d2' }}>{minConsumption}</div>
            <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.2rem' }}>Min kWh/day</div>
          </div>
        </div>

        {/* Chart Container - Full Width */}
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
  );
};

export default SevenDayEnergyCard;
