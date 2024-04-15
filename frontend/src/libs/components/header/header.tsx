
import styles from './styles.module.scss';
import { Logo } from './logo/logo';

const Header: React.FC = () => {

  return (
    <div className="header">
        <Logo/>
        <div className='container header__container'>

        </div>
        <div className="logo header__logo">

        </div>
        <div className="header__menu">

        </div>
        <div className="header__buttons">
            <div className="button">

            </div>
            <div className="button">
                
            </div>
        </div>
   
    </div>
   
  );
};

export { Header };