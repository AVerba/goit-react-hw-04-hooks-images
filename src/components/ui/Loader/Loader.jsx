import React from 'react';
import { useState } from 'react';
import { css } from '@emotion/react';
import BounceLoader from 'react-spinners/BounceLoader';
import styles from './Loader.module.css';

function ImageLoader() {
  return (
    <div className={styles.loader}>
      <BounceLoader color={'#23967F'} loading={styles.loading} size={100} />
    </div>
  );
}

export default ImageLoader;
