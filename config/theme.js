import { createTheme } from '@mui/material/styles';
// Create a theme instance.
const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
    },
    typography: {
        pageTitle: {
            fontWeight: 700,
            fontSize: '1.5rem',
        },
        pageSubTitle: {
            fontWeight: 300,
            fontSize: '1.5rem',
        },
    },
});


theme.typography.pageTitle = {
    fontSize: '1.5rem',
    '@media (min-width:600px)': {
        fontSize: '2rem',
    },
};

theme.typography.pageSubTitle = {
    fontSize: '1.25rem',
    '@media (min-width:600px)': {
        fontSize: '1.75rem',
    },
};

export default theme;