import Button from "@mui/material/Button";
import { withStyles } from '@mui/styles';

export const ButtonRound = withStyles({
  root: {
    backgroundColor: '#FB23FF',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 46,
    padding: '0 30px',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: "#C211C6",
    },
  },
})(Button);