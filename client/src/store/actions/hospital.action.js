import axios from "../../api";
import swal from "sweetalert"
import { setIsLoading } from "./global.action";

export function setHospitals(payload) {
  return { type: "HOSPITALS/SET_HOSPITALS", payload };
}

export function setDetailHospital(payload) {
  return { type: "DETAIL_HOSPITAL/SET_DETAIL_HOSPITAL", payload };
}

export function setSearchHospital(payload) {
  return { type: "SEARCH_HOSPITALS/SET_SEARCH_HOSPITALS", payload };
}

export function getListHospital({ url }) {
  return (dispatch => {
    axios({
      method: "GET",
      url,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(({ data }) => {
        dispatch(setHospitals(data));
        dispatch(setIsLoading(false));
      })
      .catch(err => {
        dispatch(setIsLoading(false));
        console.log("error get hospital list:", err);
        swal("Oops", "Internal server error!", "error");
      })
  })
}

export function getDetailHospital({ url, setModalShow }) {
  return (dispatch => {
    axios({
      method: "GET",
      url,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(async ({ data }) => {
        await dispatch(setDetailHospital(data));
        setModalShow(true);
      })
      .catch(err => {
        console.log("error get hospital detail:", err);
        swal("Oops", "Internal server error!", "error");
      })
  })
}

export function searchHospital({ url }) {
  return (dispatch => {
    axios({
      method: "GET",
      url,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(async ({ data }) => {
        await dispatch(setSearchHospital(data.data.hospitals));
      })
      .catch(err => {
        console.log("error search hospital:", err);
        swal("Oops", "Internal server error!", "error");
      })
  })
}