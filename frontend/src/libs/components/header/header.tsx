
import styles from './styles.module.scss';
import { Logo, Button } from '~/libs/components/components';
import { getValidClassNames } from '~/libs/helpers/get-valid-class-names.helper';

const Header: React.FC = () => {

  return (
    <div className={styles['header']}>
       
        <div className={getValidClassNames(
          styles['header__container'],
          '_container'
        )}>
          <Logo/>
         
          <nav className={styles["header__menu"]}>
            <div className={styles["header__menu-item"]}>
              ГОЛОВНА
            </div>
            <div className={styles["header__menu-item"]}>
              ПРО НАС
            </div>
            <div className={styles["header__menu-item"]}>
              ЗВЕРНЕННЯ ГРОМАДЯН
            </div>
            <div className={styles["header__menu-item"]}>
              НОВИНИ
            </div>
          </nav>
          <div className={styles["header__buttons"]}>
            <Button iconName='plus' style='square' iconWidth={18} iconHeight={18}/>
            <Button label='Увійти' style='primary'/>
          </div>
        </div>
        
   
    </div>
   
  );
};

export { Header };