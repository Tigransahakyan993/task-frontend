import React, {useEffect, useState} from 'react';
import {withRouter, NavLink} from 'react-router-dom'
import {Container, Row, Col, Table, Button} from "reactstrap";
import Loader from "../../UiComponents/Loader";
import ImageComponent from "../../ImageComponent/ImageComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEdit, faTimes,} from "@fortawesome/free-solid-svg-icons";
import Modal from '../../../containers/AddEditProductModal';
import ConfirmModal from '../../UiComponents/ComfirmModal';
import {userRole} from "../../../config";
import ReactPaginate from "react-paginate";

const RestaurantComponent = (props) => {

    const [searchParams, setSearchParams] = useState({
        limit: 10,
        offset: 0,
        restaurantId: props.match.params.id,
    });

    const [isOpen, setIsOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [productData, setProductData] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [tempProductId, setTempProductId] = useState('');

  useEffect(() => {
      props.fetchRestaurantData(searchParams.restaurantId);
      props.fetchAllProducts(searchParams);
  },[]);

  useEffect(() => {
     setCurrentPage(() => 0);
     setSearchParams((prev) => {
         return {
             limit: 10,
             offset: 0,
             restaurantId: props.match.params.id,
         }
     })
  },[props.match.params.id]);

  useEffect(() => {
      props.fetchRestaurantData(searchParams.restaurantId);
  },[searchParams.restaurantId]);

  useEffect(() => {
      props.fetchAllProducts(searchParams);
  },[searchParams]);

    const handlePageClick = (selected) => {
        setCurrentPage(selected);
        setSearchParams((prev) => {
            return {
                ...prev,
                offset: selected * prev.limit
            }
        })
    }

    const toggle = () => setIsOpen(!isOpen);

    const toggleConfirmModal = (id) => {
        setTempProductId(id)
        setOpenConfirm(!openConfirm)
    };


    const renderTableBody = (products) => {
        return products.map(product => {
            return (
                <tr key={product.id}>
                    <td>
                        <ImageComponent height='40px' width='40px' src={!!product.image ? product.image : 'https://www.tokyo-city.ru/goods/sushi_sake.jpg'}/>
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td><FontAwesomeIcon
                        icon={faEye}
                        className='updateButton'
                        onClick={() => {props.history.push(`/products/${product.id}`)}}
                    /></td>
                    {props.user && props.restaurant && props.user.restaurantId === props.restaurant.id &&
                        <>
                            <td><FontAwesomeIcon icon={faEdit}
                                                 className='updateButton'
                                                 onClick={(ev) => {
                                                     setProductData(product);
                                                     setIsOpen(!isOpen)
                                                 }
                                                 }
                            />
                            </td>
                            <td><FontAwesomeIcon onClick={() => toggleConfirmModal(product.id)} className='deleteButton' icon={faTimes}/></td>
                        </>
                    }
                </tr>
            )
        })
  }

  const renderRestaurantHeader = () => {
    return (
      <Row>
        <Col className='pt-2'>
          <ImageComponent
            src='https://media-cdn.tripadvisor.com/media/photo-s/1a/18/3a/cb/restaurant-le-47.jpg'
            height='55px'
            width='auto'
          />
        </Col>
        <Col className='pt-2'>
          <h5>{props.restaurant.name}</h5>
        </Col>
        <Col className='pt-2'>
          <Button onClick={() => {
              setProductData(null);
              toggle();
          }}>Add Product</Button>
        </Col>
      </Row>
    )
  }

  return (
      props.loading ?
      <Container>
          <Loader />
      </Container> :
      <Container className='bg-light mt-2'>
        {renderRestaurantHeader()}
          <Table className='mt-2'>
              <thead>
              <tr>
                  <th>pic</th>
                  <th>name</th>
                  <th>price</th>
              </tr>
              </thead>
              <tbody>
              {!!props.products && !!props.products.products && renderTableBody(props.products.products)}
              </tbody>
          </Table>
          <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              forcePage={currentPage}
              pageCount={Math.ceil(props.products.count / searchParams.limit)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={(page) => {handlePageClick(page.selected)}}
              containerClassName={'pagination'}
              activeClassName={'active-page'}
              previousClassName={'previous-page'}
              nextClassName={'next-page'}
              disabledClassName={'disable'}
              breakClassName={'break-me'}
          />
          {props.user && (props.user.role === userRole.owner) &&
          <Modal
              isOpen={isOpen}
              toggle={toggle}
              productData={productData}
          />}
          {<ConfirmModal
          toggle={toggleConfirmModal}
          isOpen={openConfirm}
          check={() => {
              props.deleteProduct(tempProductId);
              toggleConfirmModal('')
          }}
          />}
      </Container>
  )
}

export default withRouter(RestaurantComponent)