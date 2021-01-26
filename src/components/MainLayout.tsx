import React from 'react';
import { useSelector } from 'react-redux';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

import Theme from '../theme/interface';
import { State } from '../store';

import Titlebar from './Titlebar';

const useStyles = createUseStyles<Theme>((theme: Theme): any => ({
  background: {
    background: theme.mainBg,
    color: theme.mainFontColor,
    fontSize: 15,
    overflow: 'hidden',
    height: '100%',
    width: '100%'
  },
  isDarwin: {
    paddingTop: 22
  }
}));

const MainLayout: React.FC = () => {
  const classes = useStyles();
  const platform = useSelector((state: State) => state.app.platform);

  return (
    <div
      className={clsx({
        [classes.background]: true,
        [classes.isDarwin]: platform === 'darwin',
        'd-flex': true
      })}
    >
      {platform === 'darwin' && (<Titlebar />)}

      content here
    </div>
  );
};

export default MainLayout;
