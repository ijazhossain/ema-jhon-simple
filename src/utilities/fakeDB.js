const addToDb = id => {
    const storedCart = localStorage.getItem('shopping-cart')
    let shoppingCart = {}
    if (!storedCart) {
        localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart))
    } else {
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
export {
    addToDb
}