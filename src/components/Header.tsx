import logo from '../assets/rocket.svg'
import styles from './Header.module.css'


export function Header(){
    return(
        <header className={styles.header}>
            <img src={logo} alt="logo" />
            <strong>todo</strong>
        </header>
    )
}