import TextField from "@mui/material/TextField";
import { withStyles } from '@mui/styles';

export const TextFieldBorders = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#FB23FF',
        },
        '& .MuiOutlinedInput-root': {
            '& input': {
                color: 'white',
                paddingTop: '1rem',
                paddingBottom: '1rem',
                textAlign: 'center',
                "&::placeholder": {
                    color: "rgb(255, 255, 255, 0.6)",
                    opacity: 1,
                },
                "&:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 1000px var(--page-bg-color) inset",
                    WebkitTextFillColor: 'white',
                    borderRadius: 0
                }
            },
            '& fieldset': {
                borderColor: '#FB23FF',
                borderRadius: '2rem',
                color: 'white',
            },
            '&:hover fieldset': {
                border: '2px solid #FB23FF',
            },
            '&.Mui-focused fieldset': {
                border: '2px solid #FB23FF',
            },
        },
    },
})(TextField);