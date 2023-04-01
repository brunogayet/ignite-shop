import { styled } from "../../styles";

export const CartSectionContainer = styled('div', {
    position: 'fixed',
    overflowY: 'auto',
    right: 0,
    top: 0,

    boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',
    
    display: 'flex',
    flexDirection: 'column',

    width: 480,
    height: '100%',
    backgroundColor: '$gray800',

    '& > span': {
        
        display: 'flex',
        justifyContent: 'flex-end',

        padding: '1.5rem',

        svg: {
            color: '$gray500',
            cursor: 'pointer',
        },
    },

    '& > div': {
        padding: '1.5rem 3rem 3rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',

        'main.cart-list': {
            h1: {
                fontSize: '$lg',
                fontWeight: 'bold',
                paddingBottom: '2rem',
            },
            
            '& > div': {
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
            },
        },

        footer: {
            
            main: {
                padding: '3.5625rem 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4375rem',

                div: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '$md',

                    'span:first-child': {
                        fontSize: '$sm',
                    },

                    'strong.amount': {
                        fontSize: '$xl'
                    }
                },
            },

            button: {
                width: '24rem',
                padding: '1.25rem 2rem',
                backgroundColor: '$green500',
                color: '$white',

                fontSize: '$md',
                fontWeight: 'bold',
                lineHeight: '160%',

                border: 0,
                borderRadius: 8,

                cursor: 'pointer'
            }
        },

        'main.cart-empty': {
            h1: {
                fontSize: '$lg',
                fontWeight: 'bold',
                paddingBottom: '1rem',

                strong: {
                    color: '$green300'
                }
            },
            
            '& > div': {
                display: 'flex',
                gap: '1rem',
                color: '$gray500',

                alignItems: 'center',

                span: {
                    color: '$gray500',
                    lineHeight: '120%',
                },

                svg: {
                    color: '$green500',
                }
            }
        },
    },

    zIndex: 1,
})

export const CartItem = styled('div', {
    
    display: 'flex',
    gap: '1.25rem',


    'div.cart-image': {
        background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',

        img: {
            objectFit: 'cover'
        },
    },

    'div.cart-description': {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.30rem',
        
        '& > div': {
            display: 'flex',
            alignItems: 'center',

            span: {
                fontWeight: 'bold',

                button: {
                    border: 0,
                    outline: 'none',
                    backgroundColor: 'transparent',
                    color: '$green300',
                    cursor: 'pointer'
                }
            },
            'span.cart-item-total': {
                padding: '0.35rem 0.5rem'
            },
        },

        strong: {
            fontSize: '$md',
            color: '$gray100',
        },

        button: {
            display: 'contents',
            border: 0,
            outline: 'none',
            backgroundColor: 'transparent',
            color: '$green500',
            fontWeight: 'bold',
            fontSize: '$sm',
            cursor: 'pointer',
        },

        '& > span': {
            fontSize: '$md',
            color: '$gray300',
        }
    }
})