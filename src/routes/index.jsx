import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import LayoutHome from "../layouts/LayoutHome";
import InventarioComp from "../components/home/InventarioComp";
import VenderComp from "../components/home/VenderComp";
import EstadisticasComp from "../components/home/EstadisticasComp";

export const router = createBrowserRouter([
    
    {
      path: '/',
      element: <LayoutHome />,
      children: [
        { index: true, element: <InventarioComp />  },
       
        {path: 'vender', element: <VenderComp/>},
        {path: 'estadisticas', element: <EstadisticasComp/>},
      ],
    },
    
    {
        path: '*',
        element: <PageNotFound/>
    }


   

  ]);