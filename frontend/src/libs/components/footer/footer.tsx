import React from 'react';
import { Logo } from '../components';
import { Icon } from '../components';

import { getValidClassNames } from '~/libs/helpers/get-valid-class-names.helper';

import styles from './styles.module.scss';

const Footer: React.FC = () => {
  return (
    <div className={styles['footer']}>
        <div className={
            getValidClassNames(styles["footer__container"],
            "_container")}>
            <Logo/>
            <div className={styles["footer__socials"]}>
                <a href="" className={styles["footer__social"]}>
                    <div className={styles['footer__icon-container']}>
                        <Icon name="telegram"/>
                    </div>
                </a>
                <a href="" className={styles["footer__social"]}>
                    <div className={styles['footer__icon-container']}>
                        <Icon name="viber"/>
                    </div>
                </a>
                <a href="" className={styles["footer__social"]}>
                    <div className={styles['footer__icon-container']}>
                        <Icon name="youTube"/>
                    </div>
                </a>
                <a href="" className={styles["footer__social"]}>
                    <div className={styles['footer__icon-container']}>
                        <Icon name='instagram'/>
                    </div>
                </a>
                <a href="" className={styles["footer__social"]}>
                    <div className={styles['footer__icon-container']}>
                        <Icon name="facebook"/>
                    </div>
                </a>
            </div>  
        </div>
    </div>
  );
};

export  { Footer };
