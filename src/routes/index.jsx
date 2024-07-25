import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import LayoutHome from "../layouts/LayoutHome";
import InventarioComp from "../components/home/InventarioComp";
import ComprarComp from "../components/home/ComprarComp";

export const router = createBrowserRouter([
    
    {
      path: '/',
      element: <LayoutHome />,
      children: [
        { index: true, element: <InventarioComp />  },
       
        {path: 'comprar', element: <ComprarComp/>}

        
      ],
    },
    
    {
        path: '*',
        element: <PageNotFound/>
    }


   

  ]);