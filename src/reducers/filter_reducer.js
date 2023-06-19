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

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
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

    // const { sort_type, filtered_products } = state;
    // let temp = [...filtered_products];
    // switch (sort_type) {
    //   case "price-lowest":
    //     temp = temp.sort((a, b) => {
    //       return a - b;
    //     });
    //   case "price-highest":
    //     temp = temp.sort((a, b) => {
    //       return b - a;
    //     });
    //   case "name-a":
    //     temp = temp.sort((a, b) => {
    //       return a.name.localeCompare(b.name);
    //     });
    //   case "name-z":
    //     temp = temp.sort((a, b) => {
    //       return b.name.localeCompare(a.name);
    //     });
    //     return { ...state, filtered_products: temp };
    // }
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
