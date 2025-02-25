import styles from "./page.module.css";
import SignIn from "./sign-in/Sign-in";

export default function Page() {

  return (
    <div>
      <main className={styles.index}>
        <header>
          <h1>Welcome to Fetch a Friend!</h1>
          <h3>A matchmaking tool to find four-footed friends</h3>
        </header>
        <SignIn />
      </main>
    </div>
  );
}
