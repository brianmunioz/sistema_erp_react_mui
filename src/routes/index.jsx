import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import LayoutHome from "../layouts/LayoutHome";
import InventarioComp from "../pages/home/InventarioComp";
import VenderComp from "../pages/home/VenderComp";
import EstadisticasComp from "../pages/home/EstadisticasComp";
import CategoriasComp from "../pages/home/CategoriasComp";
import HomePage from "../pages/HomePage";

export const router = createBrowserRouter([
    
    {
      path: '/productos',
      element: <LayoutHome />,
      children: [
        { index: true, element: <InventarioComp />  },
       
        {path: 'vender', element: <VenderComp/>},
        {path: 'estadisticas', element: <EstadisticasComp/>},
        {path: 'categorias', element: <CategoriasComp/>},

      ],
    },{
      path: '/',
      element: <HomePage/>
  },

    {
        path: '*',
        element: <PageNotFound/>
    }


   

  ]);