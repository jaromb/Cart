
export const getCart = () => new Promise((resolve, reject) => {
    fetch("https://my-helio-cart-api.herokuapp.com/cart")
    .then(cart => {
        resolve(cart.json())
    }).catch(reject)

}) 

export const addItemToCart = (item) => new Promise((resolve,reject) => {
    fetch("https://my-helio-cart-api.herokuapp.com/cart", {
        method: "POST",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(item)
    })
    .then(cart => {
        resolve(cart.json())
    }).catch(reject)
})

export const removeItemFromCart = (_id) => new Promise((resolve,reject) => {
    console.log('delete button clicked for item id: ' + _id)
    fetch(`https://my-helio-cart-api.herokuapp.com/cart/${_id}`, {
        method: "DELETE"
    })
    .then(cart => {
        resolve(cart.json())
    }).catch(reject)
})

export const updateItemInCart = (item) => new Promise((resolve, reject) => {
    fetch("https://my-helio-cart-api.herokuapp.com/cart", {
        method: "PUT",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(item)
    })
}
)

