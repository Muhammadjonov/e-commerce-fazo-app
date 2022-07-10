import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css'
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import 'react-phone-input-2/lib/high-res.css';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import "./static/css/_style.scss";
import "./i18next/config";
import { store } from './Store'
import { Provider } from 'react-redux'
import LoaderComp from './components/LoaderComp';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<Provider store={store}>
		<Suspense fallback={<LoaderComp />}>
			<Router>
				<App />
			</Router>
		</Suspense>
	</Provider>
);


reportWebVitals();
