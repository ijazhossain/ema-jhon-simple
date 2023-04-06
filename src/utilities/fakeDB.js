const addToDb = id => {
    const storedCart = localStorage.getItem('shopping-cart')
    let shoppingCart = {}
    if (storedCart) {
        shoppingCart = JSON.parse(storedCart)
    }
    const quantity = shoppingCart[id];
    if (quantity) {
        shoppingCart[id] = quantity + 1
    } else {
        shoppingCart[id] = 1
    }
    localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart))
}
const getCart = () => {
    let shoppingCart = {}
    const storedCart = localStorage.getItem('shopping-cart')
    if (storedCart) {
        shoppingCart = JSON.parse(storedCart)
    }
    return shoppingCart;
}
const removeFromDb = (id) => {
    console.log(id)
    let cart = getCart()
    console.log(cart)
    delete cart[id]
    localStorage.setItem('shopping-cart', JSON.stringify(cart))
}
const deleteCartFromDb = () => {
    localStorage.removeItem('shopping-cart')
}
export {
    addToDb,
    getCart,
    removeFromDb,
    deleteCartFromDb
}