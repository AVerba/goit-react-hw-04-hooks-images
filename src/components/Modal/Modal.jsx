import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

export const Modal = ({ largeImageURL, tags, onCloseModal }) => {
  useEffect(() => {
    const pressCloseHandler = event => {
      if (event.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', pressCloseHandler);
    return () => {
      window.removeEventListener('keydown', pressCloseHandler);
    };
  }, [onCloseModal]);

  const backdropCloseModal = event => {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  };

  return (
    <div className={styles.overlay} onClick={backdropCloseModal}>
      <div className={styles.modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
