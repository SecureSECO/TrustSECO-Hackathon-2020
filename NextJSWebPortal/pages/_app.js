import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/searchbar.css';
import { Container, Row, Col } from 'react-grid-system';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
