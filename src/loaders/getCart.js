import { getCart } from "../utilities/fakeDB"

const cartProductsLoader = async () => {
    const loadData = await fetch('product.json')
    const products = await loadData.json()
    const savedCart = []
    const storeCart = getCart()
    for (const id in storeCart) {
        const addedProduct = products.find(item => item.id === id)
        if (addedProduct) {
            const quantity = storeCart[id]
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct)
        }
    }

    return savedCart;
}
export { cartProductsLoader }