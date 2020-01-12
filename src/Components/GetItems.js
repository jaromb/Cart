export const getItems = async () => {
  try {
    const response = await fetch(
      "https://my-helio-cart-api.herokuapp.com/items",
      {
        credentials: "include",
        contentSecurityPolicy: "upgrade-insecure-requests"
      }
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async () => {
  try {
    const response = await fetch(
      "https://my-helio-cart-api.herokuapp.com/users",
      {
        credentials: "include",
        contentSecurityPolicy: "upgrade-insecure-requests"
      }
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }
};
