import Button from "@mui/material/Button";
import { withStyles } from '@mui/styles';

export const ButtonRound = withStyles({
  root: {
    backgroundColor: '#FB23FF',
    border: 0,
    color: 'white',
    height: '3.5rem',
    fontSize: '1rem',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: "#C211C6",
    },
  },
})(Button);