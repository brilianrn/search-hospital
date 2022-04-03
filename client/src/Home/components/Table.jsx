import React, { useEffect, useState } from 'react';
import '../style/home.style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailHospital, getListHospital } from '../../store/actions/hospital.action';
import { Modal, Spinner } from '../../commons/components';
import { Pagination } from 'react-bootstrap';

export default function Table(props) {
  const dispatch = useDispatch();
  const hospitals = useSelector((state) => state.hospitalReducer.hospitals);
  const detailHospital = useSelector((state) => state.hospitalReducer.detailHospital);
  const isLoading = useSelector((state) => state.globalReducer.isLoading);

  const [modalShow, setModalShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(async () => {
    await dispatch(getListHospital({ url: `/hospital?page=${currentPage}&pageSize=10&filter=[]&sort=[{"updatedAt": "asc"}]` }));
  }, []);

  function changePage(destinationPage) {
    setCurrentPage(destinationPage);
    dispatch(getListHospital({ url: `/hospital?page=${destinationPage}&pageSize=10&filter=[]&sort=[{"updatedAt": "asc"}]` }));
  }

  async function showDetail(id) {
    await dispatch(getDetailHospital({ url: `/hospital/detail/${id}`, setModalShow }));
  }

  return (
    <>
      {isLoading ? <Spinner /> :
        <>
          <table id="dtHorizontalExample" class="table table-striped table-bordered" cellspacing="0">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.data.hospitals?.map((hospital, i) => {
                return (
                  <tr>
                    <td>{i + 1 === 10 ? `${currentPage}0` : currentPage > 1 ? `${currentPage - 1}${i + 1}` : i + 1}</td>
                    <td>{hospital.name}</td>
                    <td>
                      <button type="button" class="btn btn-primary" onClick={() => showDetail(hospital.id)}>Order</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <Pagination className='d-flex justify-content-center'>
            {hospitals.currentPage === 2 ?
              <>
                <Pagination.First onClick={() => changePage(1)} />
                <Pagination.Prev onClick={() => changePage(hospitals.prevPage)} />
                <Pagination.Item onClick={() => changePage(hospitals.prevPage)}>{hospitals.currentPage - 1}</Pagination.Item>
              </>
              : hospitals.currentPage > 1 ?
                <>
                  <Pagination.First onClick={() => changePage(1)} />
                  <Pagination.Prev onClick={() => changePage(hospitals.prevPage)} />
                  <Pagination.Item onClick={() => changePage(hospitals.currentPage - 2)}>{hospitals.currentPage - 2}</Pagination.Item>
                  <Pagination.Item onClick={() => changePage(hospitals.prevPage)}>{hospitals.currentPage - 1}</Pagination.Item>
                </>
                : <>
                  <Pagination.First disabled />
                  <Pagination.Prev disabled />
                </>
            }
            <Pagination.Item active>{hospitals.currentPage}</Pagination.Item>
            {hospitals.totalPage - currentPage === 1 ?
              <>
                <Pagination.Item onClick={() => changePage(hospitals.nextPage)}>{hospitals.currentPage + 1}</Pagination.Item>
                <Pagination.Next onClick={() => changePage(currentPage + 1)} />
                <Pagination.Last onClick={() => changePage(hospitals.totalPage)} />
              </>
              : currentPage < hospitals.totalPage ?
                <>
                  <Pagination.Item onClick={() => changePage(hospitals.nextPage)}>{hospitals.currentPage + 1}</Pagination.Item>
                  <Pagination.Item onClick={() => changePage(currentPage + 2)}>{hospitals.currentPage + 2}</Pagination.Item>
                  <Pagination.Next onClick={() => changePage(currentPage + 1)} />
                  <Pagination.Last onClick={() => changePage(hospitals.totalPage)} />
                </>
                : <>
                  <Pagination.Next disabled />
                  <Pagination.Last disabled />
                </>
            }
          </Pagination>
          <Modal
            detailHospital={detailHospital}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </>
      }
    </>
  )
}
