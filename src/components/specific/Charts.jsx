import React from 'react'
import {Line,Doughnut} from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
} from 'chart.js'
import { orange, purple, purpleLight } from '../../constants/color';
import { getLastSevenDays } from '../../lib/features';

ChartJS.register(
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
);

const labels = getLastSevenDays()

const lineChartOptions = {
  responsive:true,

  plugins:{
    legend:{
      display:false,
    },
    title:{
      display:false,
    },
  },
  scales:{
    x:{
        grid:{
          display:false
        }
    },
    y:{
      beginAtZero:true,
      grid:{
        display:false
      }
    }
  }
};

const LineChart = ({value=[]}) => {
  const data = {
    labels ,
    datasets:[{
      data:value,
      label:"Messages",
      fill:true,
      backgroundColor:purpleLight,
      borderColor:purple
    }
  
  ],
  }
  return (
    <Line data={data} options={lineChartOptions} >Charts</Line>
  )
}

const DoughnuttOptions = {
  responsive:true,
  plugins:{
    legend:{
      display:false,
    }
  },
  cutout:120,
}

  const DoughnutChart = ({value=[],labels=[]}) => {
    const data = {
      labels ,
      datasets:[{
        data:value,
        fill:true,
        backgroundColor:[purpleLight ,orange ],
        hoverBackgroundColor:[purple,orange],
        borderColor:[purple,orange],
        offset:30
      }
      
    
    ],
  }
    return <Doughnut style={{zIndex:10}} data={data} options={DoughnuttOptions} />
  }

export {LineChart,DoughnutChart}