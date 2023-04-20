import React, {Component} from 'react';
import styles from '../style/Footer.module.css';

class Footer extends Component {
    render() {
        return (
            <footer className={styles.footer}>
                ©2023 ChatGPT. All Rights Reserved. Website Made by Fuhao Ruan
            </footer>
        );
    }
}

export default Footer;
