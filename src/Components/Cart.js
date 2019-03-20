
export const getCart = () => new Promise((resolve, reject) => {
    fetch("https://mysterious-savannah-64434.herokuapp.com/cart")
    .then(cart => {
        resolve(cart.json())
    }).catch(reject)

}) 

export const addItemToCart = (item) => new Promise((resolve,reject) => {
    fetch("https://mysterious-savannah-64434.herokuapp.com/cart", {
        method: "POST",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(item)
    })
    .then(cart => {
        resolve(cart.json())
    }).catch(reject)
})

export const removeItemFromCart = (id) => new Promise((resolve,reject) => {
    console.log(id)
    fetch(`https://mysterious-savannah-64434.herokuapp.com/cart/${id}`, {
        method: "DELETE"
    })
    .then(cart => {
        resolve(cart.json())
    }).catch(reject)
})

