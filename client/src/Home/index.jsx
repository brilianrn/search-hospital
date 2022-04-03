import React, { useEffect, useState } from 'react';
import './style/home.style.css';
import Table from './components/Table';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailHospital, getListHospital, searchHospital } from '../store/actions/hospital.action';
import { Modal } from '../commons/components';

export default function Home() {
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState("");
  const searchHospitals = useSelector((state) => state.hospitalReducer.searchHospitals);
  const detailHospital = useSelector((state) => state.hospitalReducer.detailHospital);
  const [modalShow, setModalShow] = useState(false);

  useEffect(async () => {
    await dispatch(searchHospital({ url: `/hospital/search?filter=${searchString}` }));

    setTimeout(() => {
      console.log(searchHospitals)
    }, 3000)
  }, []);

  const handleOnSearch = (string, results) => {
    console.log(string, results);
    setSearchString(string);
  };

  const handleOnClear = () => {
    console.log("Cleared");
    setSearchString("");
  };

  const handleOnSelect = (result) => {
    dispatch(getDetailHospital({ url: `/hospital/detail/${result.id}`, setModalShow }));
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}></span>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }

  return (
    <>
      <div className='container home'>
        <div className="table-hospital">
          <div className="row">
            <div className="col-12 col-lg-7">
              <p className='home-list-title text-start'>Hospital List</p>
            </div>
            <div className="col-12 col-lg-5">
              <ReactSearchAutocomplete
                placeholder='Seach Hospital'
                items={searchHospitals}
                onSearch={handleOnSearch}
                onClear={handleOnClear}
                inputSearchString={searchString.toUpperCase()}
                autoFocus
                formatResult={formatResult}
                onSelect={handleOnSelect}
              />
              {/* <form class="row">
                <input
                  class="col-11"
                  type="search"
                  placeholder="Search Hospital"
                  onChange={(e) => setSearchString(e.target.value)}
                />
                <button class="col-1" type="submit">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </button>
              </form> */}
            </div>
          </div>
          <Table searchString={searchString} />
          <Modal
            detailHospital={detailHospital}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
      </div>
    </>
  )
}
