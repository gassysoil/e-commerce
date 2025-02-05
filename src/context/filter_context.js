import React, { useEffect, useContext, useReducer } from "react";
import filter_reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort_type: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  // console.log(products);
  const [state, dispatch] = useReducer(filter_reducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort_type, state.filters]);

  function setGridView() {
    dispatch({ type: SET_GRIDVIEW });
  }

  function setListView() {
    dispatch({ type: SET_LISTVIEW });
  }

  function updateSort(event) {
    const name = event.target.name;
    const sort_type = event.target.value;
    console.log(name, sort_type);
    dispatch({ type: UPDATE_SORT, payload: sort_type });
  }

  function updateFilters(event) {
    const name = event.target.name;
    const value = event.target.value;
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  }

  function clearFilters() {}

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
