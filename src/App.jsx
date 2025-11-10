import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Details from './pages/Details'
import Home from './pages/Home'

function App() {
	const routes = createBrowserRouter([
		{
			path: '/',
			element: <Home />,
		},
		{
			path: '/:id',
			element: <Details />,
		},
	])
	return <RouterProvider router={routes} />
}

export default App
