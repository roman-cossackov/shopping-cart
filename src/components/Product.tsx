import { ReactElement, memo } from "react";

import { ProductType } from "../context/ProductsProvider";
import { ReducerActionType, ReducerAction } from "../context/CartProvider";
import styles from '../css/Product.module.css'

type PropsType = {
    product: ProductType;
    dispatch: React.Dispatch<ReducerAction>;
    REDUCER_ACTIONS: ReducerActionType;
    inCart: boolean;
};

const Product = ({
    product,
    dispatch,
    REDUCER_ACTIONS,
    inCart,
}: PropsType): ReactElement => {
    const onAddToCart = () =>
        dispatch({
            type: REDUCER_ACTIONS.ADD,
            payload: { ...product, qty: 1 },
        });

    const itemInCart = inCart ? " → Item in Cart: ✔️" : null;

    const content = (
        <article className="product">
            <h3>{product.title}</h3>
            <img
                src={product.images[0]}
                alt={product.title}
                className="product__img"
            />
            <p>
                {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(product.price)}
                {itemInCart}
            </p>
            <button className={styles.productButton} onClick={onAddToCart}>Add to Cart</button>
        </article>
    );

    return content;
};

function areProductsEqual(
    { product: prevProduct, inCart: prevInCart }: PropsType,
    { product: nextProduct, inCart: nextInCart }: PropsType
) {
    return (
        Object.keys(prevProduct).every((key) => {
            return (
                prevProduct[key as keyof ProductType] ===
                nextProduct[key as keyof ProductType]
            );
        }) && prevInCart === nextInCart
    );
}

const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual);

export default MemoizedProduct;
