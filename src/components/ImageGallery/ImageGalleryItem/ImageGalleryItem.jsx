import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  tags,
  src,
  largeImageURL,
  openModalHandler,
}) => {
  const clickImageHandler = (largeImageURL, tags) => {
    openModalHandler(largeImageURL, tags);
  };
  return (
    <li className={styles.imageGalleryItem}>
      <img
        src={src}
        alt={tags}
        className={styles.itemImage}
        onClick={() => clickImageHandler(largeImageURL, tags)}
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  openModalHandler: PropTypes.func.isRequired,
};
