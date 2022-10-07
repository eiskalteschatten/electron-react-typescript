import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import { State } from '../../store';
import Titlebar from '../Titlebar';

import styles from './styles.module.scss';

const MainLayout: React.FC = () => {
  const platform = useSelector((state: State) => state.app.platform);

  return (
    <div
      className={clsx({
        [styles.isDarwin]: platform === 'darwin',
      })}
    >
      {platform === 'darwin' && (<Titlebar />)}

      content here
    </div>
  );
};

export default MainLayout;
