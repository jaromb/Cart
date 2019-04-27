
export const clearCookies = () => new Promise((resolve, reject) => {
    fetch("https://my-helio-cart-api.herokuapp.com/user/logout", {
    headers: {"content-Type": "application/json"},    
    credentials: 'include'
    })
    .then(response => {
        if (response.status===200) {
        console.log('logout successful')
        }
    }).catch(
        console.log('logout catch')
        )  

}) 