
export const getCart = () => new Promise((resolve, reject) => {
    const userValue = sessionStorage.getItem('user')
    const user = {user: userValue}
    console.log(user)
    fetch("http://localhost:4000/unique-cart", {
    method: "GET",
    headers: {"content-Type": "application/json"},    
    credentials: 'include'
    })
    .then(cart => {
        resolve(cart.json())
    }).catch(reject)

}) 

export const addItemToCart = (item) => new Promise((resolve,reject) => {
    item.user = sessionStorage.getItem('user')
    fetch("http://localhost:4000/cart", {
        method: "POST",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(item),
        credentials: 'include'
    })
    .then(cart => {
        resolve(cart.json())
    }).catch(reject)
})

export const removeItemFromCart = (_id) => new Promise((resolve,reject) => {
    console.log('delete button clicked for item id: ' + _id)
    fetch(`http://localhost:4000/cart/${_id}`, {
        method: "DELETE",
        credentials: 'include'
    })
    .then(cart => {
        resolve(cart.json())
    }).catch(reject)
})

export const updateItemInCart = (item) => new Promise((resolve, reject) => {
    fetch("http://localhost:4000/cart", {
        method: "PUT",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(item),
        credentials: 'include'
    })
}
)

