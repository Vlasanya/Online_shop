export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type User = {
  id: number;
  email: string;
  username: string;
  token?: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
  phone: string;
};

export type State = {
  theme: "light" | "dark";
  displayMode: "list" | "mediumTile" | "largeTile";
  products: Product[];
  users: User[];
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  token: string | null;
};

export type Action =
  | { type: "TOGGLE_THEME" }
  | { type: "SET_DISPLAY_MODE"; payload: "list" | "mediumTile" | "largeTile" }
  | { type: "FETCH_PRODUCTS_REQUEST" }
  | { type: "FETCH_PRODUCTS_SUCCESS"; payload: Product[] }
  | { type: "FETCH_USERS_REQUEST" }
  | { type: "FETCH_USERS_SUCCESS"; payload: User[] }
  | { type: "FETCH_PRODUCTS_FAILURE"; payload: string }
  | { type: "FETCH_USERS_FAILURE"; payload: string }
  | { type: "LOGIN_REQUEST" }
  | { type: "LOGIN_SUCCESS"; payload: { username: string; token: string } }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "SET_USER_DETAILS"; payload: User[] }
  | { type: "LOGOUT" };

export const initialState: State = {
  theme: "light",
  displayMode: "list",
  products: [],
  users: [],
  loading: false,
  error: null,
  isAuthenticated: false,
  token: null,
};

export const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    case "SET_DISPLAY_MODE":
      return {
        ...state,
        displayMode: action.payload,
      };
    case "FETCH_PRODUCTS_REQUEST":
    case "FETCH_USERS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_PRODUCTS_SUCCESS":
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case "FETCH_PRODUCTS_FAILURE":
    case "FETCH_USERS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.payload.username,
        users: state.users.map((user) =>
          user.username === action.payload.username
            ? { ...user, token: action.payload.token }
            : user
        ),
      };
    case "LOGIN_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "SET_USER_DETAILS":
      return {
        ...state,
        users: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        users: [],
        error: null,
      };
    default:
      throw new Error(`Unhandled action type: ${JSON.stringify(action)}`);
  }
};
