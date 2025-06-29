import { Outlet } from 'react-router';
import Header from "../components/layout/Header/Header.tsx";
import Footer from "../components/layout/Footer/Footer.tsx";

export default function Layout() {
  return (
    <div id="root">
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </div>
  );
}
