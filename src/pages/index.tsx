import { GetStaticProps } from "next"
import Head from 'next/head';
import Image from "next/image"
import Link from "next/link"

import Stripe from "stripe"
import { stripe } from "../lib/stripe"
import { useShoppingCart } from 'use-shopping-cart';

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { HomeContainer, Product } from "../styles/pages/home"
import { Handbag } from "@phosphor-icons/react";



interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price_formatted: string;
    price: number;
    currency: string;
  }[]
}

export default function Home({ products }: HomeProps) {

  const { addItem, handleCartHover } = useShoppingCart();
  
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>


      <HomeContainer ref={sliderRef} className="keen-slider">

        {products.map(product => {
                
          return (
              <Product className="keen-slider__slide" key={product.id}>
                <Link 
                  href={`/product/${product.id}`} 
                  prefetch={false}
                >
                  <Image 
                    src={product.imageUrl}
                    width={520} 
                    height={480} 
                    alt="" 
                  />
                </Link>

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price_formatted}</span>
                  </div>
                  <button onClick={() => {
                    addItem(product);
                    handleCartHover();
                  }}>
                    <Handbag size={24} weight="bold"/>
                  </button>
                </footer>
                
              </Product>
        )})}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const response = await stripe.products.list({
    expand: ['data.default_price']
  })
  
  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price_formatted: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount! / 100),
      price: price.unit_amount!,
      currency: 'BRL',
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, //2 hours
  }
}