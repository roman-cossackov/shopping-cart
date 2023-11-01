import { useReducer, useMemo, createContext, ReactElement } from "react";

export type CartItemType = {
    id: number;
    title: string;
    price: number;
    qty: number;
    images: string[];
};

type CartStateType = { cart: CartItemType[] };

const initialCartState: CartStateType = { cart: [] };

const REDUCER_ACTION_TYPE = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    QUANTITY: "QUANTITY",
    SUBMIT: "SUBMIT",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
    type: string;
    payload?: CartItemType;
};

const reducer = (
    state: CartStateType,
    action: ReducerAction
): CartStateType => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.ADD: {
            if (!action.payload) {
                throw new Error("action.payload missing in ADD action");
            }
            const { id, title, price, images } = action.payload;

            const filteredCart: CartItemType[] = state.cart.filter(
                (item) => item.id !== id
            );

            const itemExist: CartItemType | undefined = state.cart.find(
                (item) => item.id === id
            );

            const qty: number = itemExist ? itemExist.qty + 1 : 1;

            return {
                ...state,
                cart: [...filteredCart, { id, title, price, images, qty }],
            };
        }
        case REDUCER_ACTION_TYPE.REMOVE: {
            if (!action.payload) {
                throw new Error("action.payload missing in ROMOVE action");
            }

            const { id } = action.payload;

            const filteredCart: CartItemType[] = state.cart.filter(
                (item) => item.id !== id
            );

            return { ...state, cart: [...filteredCart] };
        }
        case REDUCER_ACTION_TYPE.QUANTITY: {
            if (!action.payload) {
                throw new Error("action.payload missing in QUANTITY action");
            }

            const { id, qty } = action.payload;

            const itemExist: CartItemType | undefined = state.cart.find(
                (item) => item.id === id
            );

            if (!itemExist) {
                throw new Error("Item must exist in order to update Quantity");
            }

            const updatedItem: CartItemType = { ...itemExist, qty };

            const filteredCart: CartItemType[] = state.cart.filter(
                (item) => item.id !== id
            );

            return { ...state, cart: [...filteredCart, updatedItem] };
        }
        case REDUCER_ACTION_TYPE.SUBMIT: {
            return { ...state, cart: [] };
        }
        default:
            throw new Error("Unidentified redcer action type");
    }
};

const useCartContext = (initialCartState: CartStateType) => {
    const [state, dispatch] = useReducer(reducer, initialCartState);

    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTION_TYPE
    }, [])

    const totalItems: number = state.cart.reduce((previousValue, cartItem) => {
        return previousValue + cartItem.qty
    }, 0)

    const totalPrice = new Intl.NumberFormat('en-US', { style:
        'currency', currency: 'USD'}).format(
            state.cart.reduce((previousValue, cartItem) => {
                return previousValue + (cartItem.qty * cartItem.price)
            }, 0)
        )

    const cart = state.cart.sort((a, b) => a.id - b.id)
    
    return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart}
};

export type UseCartContextType = ReturnType<typeof useCartContext>

const initCartContextState: UseCartContextType = {
    dispatch: () => {},
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    totalItems: 0,
    totalPrice: '',
    cart: [],
}

export const CartContext = createContext<UseCartContextType>(initCartContextState)

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
    return (
        <CartContext.Provider value={useCartContext(initialCartState)}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext