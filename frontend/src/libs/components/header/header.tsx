
import styles from './styles.module.scss';
import { Logo, Button } from '~/libs/components/components';
import { getValidClassNames } from '~/libs/helpers/get-valid-class-names.helper';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '~/libs/enums/app-route.enum';

const Header: React.FC = () => {

  return (
    <div className={styles['header']}>
       
        <div className={getValidClassNames(
          styles['header__container'],
          '_container'
        )}>
          <NavLink to={AppRoute.ROOT}>
            <Logo/>
          </NavLink>
         
          <nav className={styles["header__menu"]}>
            <div className={styles["header__menu-item"]}>
              <NavLink to={AppRoute.ROOT}>
                ГОЛОВНА
              </NavLink>
            </div>
            <div className={styles["header__menu-item"]}>
              <NavLink to={AppRoute.ABOUT_US}>
                ПРО НАС
              </NavLink>
            </div>
            <div className={styles["header__menu-item"]}>
              <NavLink to={AppRoute.APPEALS}>
                ЗВЕРНЕННЯ ГРОМАДЯН
              </NavLink>
            </div>
            <div className={styles["header__menu-item"]}>
              <NavLink to={AppRoute.NEWS}>
                НОВИНИ
              </NavLink>
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