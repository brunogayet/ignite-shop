import React from "react";
import axios from "axios";
import { useShoppingCart } from 'use-shopping-cart';

import Image from "next/image";
import Link from "next/link";

import { CartItem, CartSectionContainer } from "./styles";
import { MinusCircle, PlusCircle, SmileySad, X } from "@phosphor-icons/react";


export function CartSection() {

    const { 
        formattedTotalPrice, 
        cartCount, 
        cartDetails, 
        incrementItem,
        decrementItem,
        removeItem,
        redirectToCheckout,
        shouldDisplayCart,
        handleCloseCart,
    } = useShoppingCart();

    const handleCheckout = async (event) => {
        event.preventDefault();
    
        const response = await axios.post(
          '/api/checkout',
          {
            cartDetails
          }
        );
    
        if (response.status > 399) {
            console.error(response.statusText);
            return
        }

        //window.location.href = data.url;
        redirectToCheckout(response.data.id);
      }
    
    
    return (
        
        shouldDisplayCart && (
            
            <CartSectionContainer>
                <span>
                    <X weight="bold" size={24} onClick={() => handleCloseCart()} />
                </span>
                
                <div>

                    {
                        cartCount > 0 && (

                            <>
                                
                                <main className="cart-list">

                                    <h1>Sacola de compras</h1>

                                    <div>

                                        {
                                            Object.values(cartDetails).map(product => (
                                                <CartItem key={product.id}>
                                                    <div className="cart-image">
                                                        <Image 
                                                            src={product.imageUrl}
                                                            width={101}
                                                            height={93} 
                                                            alt="" 
                                                        />
                                                    </div>
                                                    <div className="cart-description">
                                                        <span>{product.name}</span>
                                                        <div>
                                                            <span>
                                                                <button onClick={() => decrementItem(product.id)}>
                                                                    <MinusCircle size={22} weight="bold" />
                                                                </button>
                                                            </span>
                                                            <span className="cart-item-total">{product.quantity}</span>
                                                            <span>
                                                                <button onClick={() => incrementItem(product.id)}>
                                                                    <PlusCircle size={22} weight="bold" />
                                                                </button>
                                                            </span>
                                                        </div>
                                                        <strong>{product.formattedValue}</strong>
                                                        <button onClick={() => {
                                                            removeItem(product.id);
                                                        }}>Remover</button>
                                                    </div>
                                                </CartItem>
                                            ))
                                        }
                                    </div>
                                </main>
                                
                                <footer>
                                    <main>
                                        <div>
                                            <span>Quantidade</span>
                                            <span>{`${cartCount} ${cartCount > 1 ? 'itens' : 'item'}`}</span>
                                        </div>

                                        <div>
                                            <strong>Valor total</strong>
                                            <strong className="amount">{formattedTotalPrice}</strong>
                                        </div>
                                    </main>

                                    <button onClick={handleCheckout}>Finalizar compra</button>
                                </footer>

                            </>
                        )
                    }

                    {
                        cartCount === 0 && (
                            <main className="cart-empty">
                                <h1>Sacola de compras <strong>vazia</strong></h1>
                                <div>
                                    <SmileySad size={60} />
                                    <span>Você merece uma camiseta confortável e bonitona, adicione uma ao seu carrinho.</span>
                                </div>
                            </main>
                        )
                    }
                </div>
            </CartSectionContainer>
        )        
    )
}