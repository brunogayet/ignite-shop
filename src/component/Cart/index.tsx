import React, { ReactNode } from 'react'
import { CartProvider } from 'use-shopping-cart'

export function Cart ({ children }: { children: ReactNode }){
    return (
        <CartProvider
            cartMode="checkout-session"
            stripe={process.env.NEXT_PUBLIC_STRIPE_API_KEY as string}
            currency="BRL"
            shouldPersist={true}
        >
            {children}
        </CartProvider>
    )
}