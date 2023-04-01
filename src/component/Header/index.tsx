import { useShoppingCart } from 'use-shopping-cart';

import Image from 'next/image'
import Link from 'next/link'

import logoImg from '../../assets/logo.svg'
import { ButtonCart, HeaderContainer } from './styles'
import { Handbag } from "@phosphor-icons/react";


export function Header() {
    
    const { cartCount, handleCartHover } = useShoppingCart();

    return (
        <HeaderContainer>
            <Link href='/'>      
                <Image src={logoImg} alt="" />
            </Link>

            <ButtonCart>
                <button onClick={() => handleCartHover()}>
                    <Handbag size={24} weight="bold" />
                    { cartCount > 0 && (<span>{cartCount}</span>)}
                </button>
            </ButtonCart>
        </HeaderContainer>
    )
}