import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import products_reducer from "./products_reducer";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      console.log(action.payload);
      let tempMax = 0;
      for (const product of action.payload) {
        tempMax = Math.max(tempMax, product.price);
      }
      console.log(tempMax);
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: { ...state.filers, max_price: tempMax, price: tempMax },
      };

    case SET_GRIDVIEW:
      return {
        ...state,
        grid_view: true,
      };

    case SET_LISTVIEW:
      return {
        ...state,
        grid_view: false,
      };

    case UPDATE_SORT:
      return {
        ...state,
        sort_type: action.payload,
      };

    case SORT_PRODUCTS:
      const { sort_type, filtered_products } = state;
      let temp = [...filtered_products];

      if (sort_type === "price-lowest") {
        temp = temp.sort((a, b) => {
          return a.price - b.price;
        });
      }
      if (sort_type === "price-highest") {
        temp = temp.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sort_type === "name-z") {
        temp = temp.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort_type === "name-a") {
        temp = temp.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      return { ...state, filtered_products: temp };

    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return { ...state, filters: { ...state.filers, [name]: value } };

    case FILTER_PRODUCTS:
      return { ...state };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
