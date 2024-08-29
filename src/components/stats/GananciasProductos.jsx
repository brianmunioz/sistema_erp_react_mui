import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);
export default function GananciasProductos({data}) {
const ganancias = data.map(gan => gan.ganancia)
const productos = data.map(gan => gan.producto)

var misoptions = {
    responsive : true,
    animation : true,
    plugins : {
        legend : {
            display : false
        },
        title: {
            display: true,
            text: 'Ganancias por producto',
            font: {
                size: 18,
            },
          },
    },
    indexAxis: 'y',
    
    scales : {
        y : {
            min : 0,
            
        },
        x: {
            ticks: { color: 'rgba(0, 220, 195)'}
        }
    },
   
};

var midata = {
    labels: productos,
    datasets: [
        {
            label: 'Ganancias',
            data: ganancias,
            backgroundColor: 'rgba(0, 220, 195, 0.5)'
        }
    ]
};


    return <Bar data={midata} options={misoptions} />
}