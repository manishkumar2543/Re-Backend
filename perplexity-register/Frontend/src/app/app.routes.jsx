import {createBrowserRouter} from 'react-router'
import Register from '../features/auth/pages/Register'
import Login from '../features/auth/pages/Login'
import Dashboard from '../features/chat/pages/Dashboard'
import Protected from '../features/auth/pages/components/Protected'
import { Navigate } from 'react-router'
export const router = createBrowserRouter([
    {
        path:'/',
        element:<Protected><Dashboard/></Protected>

    },
    {
        path:'/register',
        element:<Register/>
    
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/dashboard',
        element:<Navigate to="/" replace/>
    }
])