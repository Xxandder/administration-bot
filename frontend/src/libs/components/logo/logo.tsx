import { getValidClassNames } from '~/libs/helpers/helpers';
import logoImage from '~/assets/images/logo.png'
import styles from './styles.module.scss';

const Logo: React.FC = () => {

  return (
    <div className={styles['logo']}>
      <div className={getValidClassNames(
        styles["logo__image"],
        '_ibg')}>
        <img src={logoImage} alt="" />
      </div>
      <div className={styles["logo__text"]}>
      <div className={styles["logo__first-row"]}>
        Десята фортеця
      </div>
      <div className={styles["logo__second-row"]}>
        Благодійний фонд
      </div>
      </div>
    
    </div>
   
  );
};

export { Logo };