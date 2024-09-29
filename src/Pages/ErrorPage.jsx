import styles from '../Pages/Styles.module.css';

const ErrorPage = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Error!</h2>
        <p>Invalid location entered. Please try again.</p>
        <button onClick={onClose}>Okay</button>
      </div>
    </div>
  );
};

export { ErrorPage };
