export const getItems = async() => {
    try {
      const response = await fetch("https://my-helio-cart-api.herokuapp.com/items")
      return response.json();
  }
    catch(error) {
      console.error(error)
    }
  }


export const getUsers = async() => {
    try {
      const response = await fetch("https://my-helio-cart-api.herokuapp.com/users")
      return response.json();
  }
    catch(error) {
      console.error(error)
    }
  }

 