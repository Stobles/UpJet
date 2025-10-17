import styles from "./page.module.scss";
import { Button } from "antd";

export default function Home() {
  return (
    <div className={styles.page}>
      <Button>Тест</Button>
    </div>
  );
}
