import styles from './AppLayout.module.css';
import { Outlet } from "react-router";
import Header from "../../components/layout/Header/Header.tsx";
import Footer from "../../components/layout/Footer/Footer.tsx";
import Modal from "../../components/Modal/Modal.tsx";
import AlertToaster from "../../components/Toaster/AlertToaster/AlertToaster.tsx";

export default function AppLayout() {
  return (
    <div className={styles.layout}>
      <Modal></Modal>
      <AlertToaster></AlertToaster>
      <Header></Header>
      <div className={styles.content}>
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
}
