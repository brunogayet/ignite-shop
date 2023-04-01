import type { AppProps } from 'next/app';

import { Cart } from '../component/Cart';
import { CartSection } from '../component/CartSection';
import { Header } from '../component/Header';

import { globalStyles } from '../styles/global'
import { Container } from '../styles/pages/app';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {

  return (
    
    <Container>
      
      <Cart>

        <Header />      
        <CartSection />

        <Component {...pageProps} />
      
      </Cart>

    </Container>
  )
}
