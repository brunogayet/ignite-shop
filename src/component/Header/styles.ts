import { styled } from "../../styles";

export const HeaderContainer = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
})

export const ButtonCart = styled('div', {
    position: 'relative',
    button: {
        padding: '0.75rem',
        backgroundColor: '$gray800',
        color: '$gray500',
        borderRadius: 6,
        border: 0,
        cursor: 'pointer',

        '&:has(span)': {
            color: '$gray300'
        },

        span: {
            position: 'absolute',
            right: -8,
            top: -7,
    
            backgroundColor: '$green500',
            color: '$white',
            width: '1.5rem',
            height: '1.5rem',
            
            fontSize: '$esm',
            fontWeight: 'bold',
    
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
    
            outline: '3px solid $gray900',
            borderRadius: 1000,
        },
    }
})