import Head from 'next/head';
import Navbar from './Navbar';

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Time Boxing</title>
    </Head>
    <Navbar />
    {children}
  </>
)

export default Layout;
