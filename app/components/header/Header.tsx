import styles from '../header/header.module.css';

export default function Header(props: {
  username: string
}) {
  const username = props.username;
  return (
    <header className={styles.header}>
    <h1>Fetch a Friend</h1>
    <h3>A matchmaking tool to find four-footed friends</h3>
    <nav className={styles.nav}>
      {username && 
      <p>Welcome, <span className={styles.username}>{username}</span>
      !</p>}
      {!username && <p>TK unsigned in nav</p>}
    </nav>
    
  </header>
  );
}