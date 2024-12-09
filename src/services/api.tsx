export const fetchProducts = async (
    limit: number,
    page: number,
    sort: "asc" | "desc" = "asc",
    category?: string
  ) => {
    const baseUrl = "https://fakestoreapi.com/products";
    const categoryPath = category ? `/category/${category}` : "";
    const response = await fetch(
      `${baseUrl}${categoryPath}?sort=${sort}`
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
  
    const allProducts = await response.json();

    const start = (page - 1) * limit;
    const paginatedProducts = allProducts.slice(start, start + limit);
  
    return paginatedProducts;
  };
  
  export const fetchCategories = async () => {
    const response = await fetch("https://fakestoreapi.com/products/categories");
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
  
    return response.json();
  };
  
  export const fetchUsers = async () => {
    const response = await fetch('https://fakestoreapi.com/users');
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  };
  
  export const authenticateUser = async (username: string, password: string) => {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to authenticate");
    }
  
    const data = await response.json();
    return data;
  };
  
  export const fetchCart = async (userId: number) => {
    const response = await fetch(`https://fakestoreapi.com/carts/user/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch cart");
    }
    return response.json();
  };
  