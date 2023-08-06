import { ILoyoutProps } from "@/types/common";
import Footer from "../modules/Footer/Footer";
import Header from "../modules/header/Header";

const Layout = ({ children }: ILoyoutProps) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default Layout;