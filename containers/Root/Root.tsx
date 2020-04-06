// const styles = require('./Root.module.scss');
import styles from './Root.module.scss';
import React, { Component } from 'react';

class Root extends Component {
    render(): JSX.Element {
        return <div className={styles.root}></div>;
    }
}

export default Root;
