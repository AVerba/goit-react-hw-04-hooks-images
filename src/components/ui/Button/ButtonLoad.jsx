import styles from './Button.module.css';
import PropTypes from 'prop-types';
import cx from 'classnames';

export const ButtonLoad = ({ className, title, onClick }) => {
  const classList = cx(styles.buttonLoad, className);
  return (
    <button type="button" onClick={onClick} className={classList}>
      {title}
    </button>
  );
};

ButtonLoad.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
