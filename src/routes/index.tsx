import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home/Home'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {index:true, element: <Home/>},
            { path: '*', element: <div>Not Found</div> },
        ]
    }
])