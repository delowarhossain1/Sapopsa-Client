
const addNewProduct = (info = {}) => {
    const storedProduct = getProducts();

    if (storedProduct) {
        const filterProduct = storedProduct?.filter(p => p.id !== info.id);
        const newProduct = [...filterProduct, info];
        console.log(newProduct);
        localStorage.setItem('products', JSON.stringify(newProduct));
    }
    else{
        localStorage.removeItem('products');
        localStorage.setItem('products', JSON.stringify([info]));
    }

}

const getProducts = () => {
    const storedProduct = localStorage.getItem('products');
    const parseStoredProduct = JSON.parse(storedProduct);

    if(parseStoredProduct){
        return parseStoredProduct;
    }
    else{
        return [];
    }
}

const removeProduct = (id) => {
    const storedProduct = getProducts();

    if(id && storedProduct){
        const rest = storedProduct.filter(p => p.id !== id);
        localStorage.setItem('products', JSON.stringify(rest));
    }
}

export {
    addNewProduct,
    removeProduct,
    getProducts
}