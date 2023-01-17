
const addNewProduct = (info = {}) => {
    localStorage.setItem('products', JSON.stringify([info]));
}

const getProducts = () => {
    const storedProduct = localStorage.getItem('products');
    const parseStoredProduct = JSON.parse(storedProduct);

    return parseStoredProduct;
}

const removeProduct = () => {
    localStorage.removeItem('products');
}

export {
    addNewProduct,
    removeProduct,
    getProducts
}