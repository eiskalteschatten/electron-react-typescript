import React from 'react';
import { createUseStyles } from 'react-jss';

import Theme from '../theme/interface';

const useStyles = createUseStyles<Theme>((): any => ({
  titlebar: {
    height: 22,
    width: '100%',
    left: 0,
    position: 'fixed',
    top: 0,
    '-webkit-app-region': 'drag',
    '-webkit-user-select': 'none',
    zIndex: 1000
  }
}));

const Titlebar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.titlebar} />
  );
};

export default Titlebar;
