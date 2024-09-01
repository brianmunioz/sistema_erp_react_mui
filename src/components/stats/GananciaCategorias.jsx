import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler,
} from 'chart.js';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
);

export default function GananciasCategorias({ data }) {
    const categorias = [...new Set(data.map(gan => gan.categoria))];
    const ganancias = categorias.map(categoria => {
        return data.filter(el => el.categoria === categoria).reduce((acumulador, actual) => acumulador + parseFloat(actual.ganancia), 0).toFixed(1);
    });

    var misoptions = {
        responsive: true,
        animation: true,

        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Ganancias por categoría',
                font: {
                    size: 18,
                },
            },
        },
    };

    var midata = {
        labels: categorias,
        datasets: [
            {
                label: 'Ganancias',
                data: ganancias,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Pie style={{ margin: "80px 0px" }} data={midata} options={misoptions} />;
}
