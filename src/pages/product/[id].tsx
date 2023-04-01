import { GetStaticPaths, GetStaticProps } from "next";
import { useShoppingCart } from "use-shopping-cart";
import Head from "next/head";
import Image from "next/image";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product";

interface ProductProps {
    product: {
        id: string;
        name: string;
        imageUrl: string;
        description: string;
        price_formatted: string;
        price: number;
        currency: string;
        
    }
}

export default function Product({ product }: ProductProps) {

    const { addItem, handleCartHover } = useShoppingCart();

    return (
        <>
            <Head>
                <title>{product.name} | Ignite Shop</title>
            </Head>

            <ProductContainer>
                <ImageContainer>
                    <Image src={product.imageUrl} width={520} height={480} alt='' />
                </ImageContainer>

                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{product.price_formatted}</span>

                    <p>{product.description}</p>

                    <button onClick={() => {
                        addItem(product);
                        handleCartHover();
                    }}>
                        Colocar na sacola
                    </button>
                </ProductDetails>
            </ProductContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async ({ }) => {
    return {
        paths: [
            {
                params: { id: 'prod_N650TMWNsvKjOJ'}
            },
        ],
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {

    const productId = params.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    });

    const price = product.default_price as Stripe.Price
    
    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                description: product.description,
                price_formatted: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(price.unit_amount! / 100),
                price: price.unit_amount!,
                currency: 'BRL'
            }
        },
        revalidate: 60 * 60 * 1, // 1 hora
    }
}