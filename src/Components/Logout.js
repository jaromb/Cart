
export const clearCookies = () => new Promise((resolve, reject) => {
    fetch("http://localhost:4000/user/logout", {
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