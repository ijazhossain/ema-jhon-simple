import { getCart } from "../utilities/fakeDB"

const cartProductsLoader = async () => {
    const storeCart = getCart()
    const ids = Object.keys(storeCart);
    console.log(ids);

    const loadData = await fetch('http://localhost:5000/productById', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(ids)
    })
    const products = await loadData.json()
    const savedCart = []
    for (const id in storeCart) {
        const addedProduct = products.find(item => item._id === id)
        if (addedProduct) {
            const quantity = storeCart[id]
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct)
        }
    }

    return savedCart;
}
export { cartProductsLoader }