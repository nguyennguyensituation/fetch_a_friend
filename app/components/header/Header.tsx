import styles from '../header/header.module.css';

export default function Header(props: {
  username: string
}) {
  const username = props.username;
  return (
    <header className={styles.header}>
    <h1>Fetch a Friend</h1>
    {!username && 
      <h3>A matchmaking tool to find your next four-footed friend</h3>}
    {username && 
      <p>Welcome, <span className={styles.username}>{username}</span>
      !</p>}
  </header>
  );
}