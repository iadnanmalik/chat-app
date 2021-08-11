import '../styles/globals.css'
import { UsersWrapper } from '../context/UsersContext';
function MyApp({ Component, pageProps }) {

  return (
  //<UsersWrapper>
  <Component {...pageProps} />
  //</UsersWrapper>
  )}

export default MyApp
