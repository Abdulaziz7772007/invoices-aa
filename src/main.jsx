import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import { store } from './components/ui/redux-toolkit/store.js'

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<App />
	</Provider>
)
