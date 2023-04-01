import { styled } from ".."

export const SuccessContainer = styled('main', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    height: 656,

    h1: {
        fontSize: '$2xl',
        color: '$gray100',
        marginTop: '4rem',
    },

    p: {
        fontSize: '$xl',
        color: '$gray300',
        maxWidth: 560,
        textAlign: 'center',
        marginTop: '2rem',
        lineHeight: 1.4
    },

    a: {
        display: 'block',
        marginTop: '4rem',
        fontSize: '$lg',
        color: '$green500',
        textDecoration: 'none',
        fontWeight: 'bold',

        '&:hover': {
            color: '$green300',
        }
    },
    '& > div': {
        display: 'flex',
        position: 'relative',
        
        'div:not(:last-of-type)': {
            marginRight: '-52px',
        }
    }
})

export const ImageContainer = styled('div', {
    width: 140,
    height: 140,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 1000,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    boxShadow: '0px 0px 60px rgba(0, 0, 0, 0.8)',

    img: {
        objectFit: 'cover'
    }
})