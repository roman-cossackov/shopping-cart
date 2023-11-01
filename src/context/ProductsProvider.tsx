import { ReactElement, createContext, useState, useEffect } from "react";

export type ProductType = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
};

const initialState: ProductType[] = [];

export type UseProductsContextType = { products: ProductType[] };

const initialContextState: UseProductsContextType = { products: [] };

const ProductsContext =
    createContext<UseProductsContextType>(initialContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
    const [products, setProducts] = useState<ProductType[]>(initialState);

    useEffect(() => {
        const fetchProducts = async (): Promise<ProductType[]> => {
            const data = await fetch("https://dummyjson.com/products")
                .then((res) => res.json())
                .catch((err) => {
                    if (err instanceof Error) console.log(err.message);
                });
            return data;
        };

        fetchProducts().then((products) => setProducts(products));
    }, []);

    return (
        <ProductsContext.Provider value={{ products }}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsContext;
