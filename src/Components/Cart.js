
export const getCart = () => new Promise((resolve, reject) => {
    fetch("http://localhost:5000/cart")
    .then(cart => {
        resolve(cart.json())
    }).catch(reject)

}) 

export const addItemToCart = (item) => new Promise((resolve,reject) => {
    fetch("http://localhost:5000/cart", {
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
    fetch(`http://localhost:5000/cart/${id}`, {
        method: "DELETE"
    })
    .then(cart => {
        resolve(cart.json())
    }).catch(reject)
})

