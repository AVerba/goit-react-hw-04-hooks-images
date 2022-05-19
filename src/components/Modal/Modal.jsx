import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.pressKeyHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.pressKeyHandler);
  }

  pressKeyHandler = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  backdropClickHandler = event => {
    if (event.currentTarget === event.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props;
    return (
      <div className={styles.overlay} onClick={this.backdropClickHandler}>
        <div className={styles.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
