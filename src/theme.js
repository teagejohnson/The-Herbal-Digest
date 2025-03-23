import {createTheme} from '@mui/material/styles';


var theme;

if (window.innerWidth < 750) {
    theme = createTheme({
        typography: {
            fontFamily: [
                'Quicksand',
                'sans-serif',
                'Bad Script',
                'cursive'
            ].join(','),
            
            h1: {
                fontFamily: 'Quicksand',
                fontSize: '6vh',
                fontWeight: 'bold',
            },

            h2: {
                fontFamily: 'Quicksand',
                fontSize: '3vh',
                fontWeight: 'bold'
            },

            h3: {
                fontFamily: 'Quicksand',
                fontSize: '3vh',
            },

            body1: {
                fontFamily: 'Quicksand',
                fontSize: '2vh',
            },

            body2: {
                fontFamily: 'Quicksand',
                fontSize: '1vh',
            },
        },

        palette: {
            primary: {
                main: '#000000',
            },

            secondary: {
                main: '#ffffff',
            },
        },
    });
}

else {
    theme = createTheme({
        typography: {
            fontFamily: [
                'Quicksand',
                'sans-serif',
            ].join(','),
            
            h1: {
                fontFamily: 'Quicksand',
                fontSize: '6vw',
                fontWeight: 'bold',
            },

            h2: {
                fontFamily: 'Quicksand',
                fontSize: '3vw',
                fontWeight: 'bold'
            },

            h3: {
                fontFamily: 'Quicksand',
                fontSize: '3vw',
            },

            body1: {
                fontFamily: 'Quicksand',
                fontSize: '1.5vw',
            },

            body2: {
                fontFamily: 'Quicksand',
                fontSize: '1vw',
            },
        },

        palette: {
            primary: {
                main: '#000000',
            },

            secondary: {
                main: '#ffffff',
            },
        },
    });
}


export default theme;