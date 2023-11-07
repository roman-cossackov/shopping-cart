import Nav from "./Nav";
import useCart from "../hooks/useCart";
import styles from "../css/Header.module.css";

type PropsType = {
    viewCart: boolean;
    setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: PropsType) => {
    const { totalItems, totalPrice } = useCart();

    const content = (
        <header className={styles.header}>
            <h1>Acme Co.</h1>
            <div className={styles.cart}>
                <div className={styles.price}>
                    <p>Total Items: {totalItems}</p>
                    <p>Total Price: {totalPrice}</p>
                </div>
                <div className={styles.cartButton}>
                    <Nav viewCart={viewCart} setViewCart={setViewCart} />
                </div>
            </div>
        </header>
    );

    return content;
};

export default Header;
