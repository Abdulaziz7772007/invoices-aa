import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import { store } from './components/ui/redux-toolkit/store.js'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<App />
		<Toaster position='top-right' richColors/>
	</Provider>
)
