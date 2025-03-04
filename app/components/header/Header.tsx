import styles from '../header/header.module.css';

export default function Header(props: {
  username: string
}) {
  const username = props.username;
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>Fetch a Friend</h1>
        <h3>A matchmaking tool to find four-footed friends</h3>
      </div>
    <nav className={styles.nav}>
      {username && 
      <p>Hello, <span className={styles.username}>{username}</span>
      !</p>}
    </nav>
    
  </header>
  );
}