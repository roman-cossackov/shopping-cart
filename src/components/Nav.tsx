import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import styles from "../css/Nav.module.css";

type PropsType = {
    viewCart: boolean;
    setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Nav = ({ viewCart, setViewCart }: PropsType) => {
    const button = viewCart ? (
        <button className={styles.productButton} onClick={() => setViewCart(false)}>View Products</button>
    ) : (
        <FontAwesomeIcon
            icon={faCartShopping}
            onClick={() => setViewCart(true)}
            className={styles.cartIcon}
            size="2x"
        />
    );

    const content = <nav className="nav">{button}</nav>;

    return content;
};

export default Nav;
