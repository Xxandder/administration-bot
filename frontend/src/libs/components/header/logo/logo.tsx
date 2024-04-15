
import logoImage from '~/assets/images/logo.svg'
import styles from './styles.module.scss';

const Logo: React.FC = () => {

  return (
    <div className={styles['logo']}>
      <div className={styles["logo__image"]}>
        <img src={logoImage} alt="" />
      </div>
      <div className={styles["logo__first-row"]}>
        Десята фортеця
      </div>
      <div className={styles["logo__second-row"]}>
        Благодійний фонд
      </div>
    </div>
   
  );
};

export { Logo };