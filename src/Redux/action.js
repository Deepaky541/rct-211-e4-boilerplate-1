import axios from "axios";
import * as types from "./actionTypes";

const getCountries = ()=>(dispatch) => {
  dispatch({ type: types.GET_COUNTRIES_REQUEST });
  axios
    .get("http://localhost:8080/countries")
    .then((r) =>dispatch({ type: types.GET_COUNTRIES_SUCCESS, payload: r.data }) 
    )
    .then((e) => dispatch({ type: types.GET_COUNTRIES_FAILURE }));
};
  const update = (id,city,population)=>(dispatch) => {
    dispatch({ type: types.UPDATE_COUNTRY_REQUEST });
    axios
      .patch(`http://localhost:8080/countries/${id}`, { city: city,population:population })
      .then((r) =>
        dispatch({ type: types.UPDATE_COUNTRY_SUCCESS, payload: r.data })
      )
      .then((e) => dispatch({ type: types.UPDATE_COUNTRY_FAILURE }));
  };
export { getCountries,update } ;
