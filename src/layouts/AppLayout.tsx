import styles from './AppLayout.module.css';
import { Outlet } from "react-router";
import Header from "../components/layout/Header/Header.tsx";
import Footer from "../components/layout/Footer/Footer.tsx";

export default function AppLayout() {
  return (
    <div className={styles.layout}>
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </div>
  );
}
