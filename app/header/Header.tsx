import styles from '../header/header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
    <h1>Fetch a Friend</h1>
    {/* <nav>
      <p>(TK nav: Log out, Favorites (with dynamic count))</p>
    </nav> */}
  </header>
  );
}