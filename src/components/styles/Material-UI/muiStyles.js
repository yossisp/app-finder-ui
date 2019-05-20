import blue from '@material-ui/core/colors/blue';
import { fade } from '@material-ui/core/styles/colorManipulator';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

const MaterialHeaderStyles = theme => ({
  palette: {
    primary: blue,
    secondary: red,
  },
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
    marginLeft: '3%'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    progressColor: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

const AppSearchBarInputStyles = theme => ({
  inputRoot: {
    progressColor: 'inherit',
    width: '100%',
  },
  inputInput: {
    color: '#fff',
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  }
});

const DrawerStyles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

const AppInfoStyles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
  paper: {
    paddingBottom: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 10,
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing.unit
  }
});

const SnackbarMessageStyles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    //display: 'flex',
    alignItems: 'center',
    flexGrow: 0
  }
});

const SimpleExpansionPanelStyles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  backgroundColor: {
    backgroundColor: theme.palette.secondary.grey,
  }
});

const UploadCSVstyles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  description: {
    fontSize: '20px'
  },
  grid: {
    marginTop: '75px'
  },
  gridDialog: {
    marginLeft: '0%'
  }
});

const AccountInfoStyles = theme => ({
  gridItem: {
    width: 60,
    height: 60,
    margin: 10,
    color: '#888'
  }
});

const SignatureStyles = theme => ({
  madeBy: {
    fontFamily: 'Dosis',
    fontWeight: 'bold',
    color: '#888',
    textAlign: 'center',
    marginTop: '20px'
  },
  developer: {
    color: '#999',
    borderBottom: '1px dashed #555',
  }
});

const LoginStyles = theme => ({
  logo: {
    width: 500,
    height: 300,
    margin: 10
  },
  signature: {
    width: 500,
    height: 100,
    margin: 10,
    WebkitAnimation: 'fadein 4s'
  },
  loginButton: {
    width: 500,
    height: 100,
    margin: 10,
    WebkitAnimation: 'fadein 4s'
  }
});

const AboutStyles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  textGrid: {
    margin: 10,
    textAlign: 'left'
  },
  text: {
    fontSize: 16,
  }
});


export {
  MaterialHeaderStyles,
  AppSearchBarInputStyles,
  DrawerStyles,
  AppInfoStyles,
  SnackbarMessageStyles,
  SimpleExpansionPanelStyles,
  UploadCSVstyles,
  AccountInfoStyles,
  SignatureStyles,
  LoginStyles,
  AboutStyles
};
