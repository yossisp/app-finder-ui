import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const MaterialBlueTheme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: '#f50057',
      grey: '#FAFAFA'
    }
  },
  typography: {
    useNextVariants: true,
  }
});

export default MaterialBlueTheme;
