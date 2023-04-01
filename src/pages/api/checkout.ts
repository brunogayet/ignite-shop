import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";
import Stripe from 'stripe';

import { validateCartItems } from 'use-shopping-cart/utilities';

interface ResponseProps {
    data: ProductProps[]
}

interface ProductProps {
    id: string,
    name: string,
    description: string,
    default_price: {
        unit_amount: number,
        currency: string
    },
    images: string[]
}

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
) {

    const { cartDetails } = req.body;

    const { data } = await stripe.products.list({
        ids: Object.keys(cartDetails),
        expand: ['data.default_price']
    }) as ResponseProps;

    const inventory= data.map(product => {

        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.default_price.unit_amount,
            image: product.images[0],
            currency: product.default_price.currency,
        }
    });

    try {

        // Validate the cart details that were sent from the client.
        const line_items = validateCartItems(inventory as any, cartDetails);
        
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed.' })
        }

        if (!cartDetails) {
            return res.status(400).json({ error: 'Cart not found.' })
        }

        // Create Checkout Sessions from body params.
        const params: Stripe.Checkout.SessionCreateParams = {
            submit_type: 'pay',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_address_collection: {
            allowed_countries: ['BR'],
            },
            line_items,
            success_url: `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_URL}`,
            mode: 'payment',
        }

        const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params);

        return res.status(200).json(checkoutSession);

    } catch (err) {
        console.log(err)
        const errorMessage = err instanceof Error ? err.message : 'Internal server error';
        res.status(500).json({ statusCode: 500, message: errorMessage });
    }
}