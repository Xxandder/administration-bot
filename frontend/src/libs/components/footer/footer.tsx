import React from 'react';
import { Logo } from '../components';
import { Icon } from '../components';

const Footer: React.FC = () => {
  return (
    <div className='footer'>
        <div className="footer__container _container">
            <Logo/>
            <div className="footer__socials">
                <a href="" className="footer__social">
                    <Icon name="telegram"/>
                </a>
                <a href="" className="footer__social">
                    <Icon name="viber"/>
                </a>
                <a href="" className="footer__social">
                    <Icon name="youTube"/>
                </a>
                <a href="" className="footer__social">
                    <Icon name='instagram'/>
                </a>
                <a href="" className="footer__social">
                    <Icon name="facebook"/>
                </a>
            </div>  
        </div>
    </div>
  );
};

export  { Footer };
