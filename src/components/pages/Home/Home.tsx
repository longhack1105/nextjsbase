import { PropsHeader } from "./interfaces";
import styles from "./Home.module.scss";

function Home({}: PropsHeader) {
  return (
    <div className={styles.container}>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
