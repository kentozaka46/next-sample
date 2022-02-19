import { NextPage } from "next";
import styles from "./layout.module.css";

const Layout: NextPage = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Layout;
