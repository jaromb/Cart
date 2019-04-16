export const getItems = async() => {
    try {
      const response = await fetch("http://localhost:5000/items")
      return response.json();
  }
    catch(error) {
      console.error(error)
    }
  }


export const getUsers = async() => {
    try {
      const response = await fetch("http://localhost:5000/users")
      return response.json();
  }
    catch(error) {
      console.error(error)
    }
  }

 