export const getItems = async() => {
    try {
      const response = await fetch("http://localhost:5000/items")
      return response.json();
  }
    catch(error) {
      console.error(error)
    }
  }


 