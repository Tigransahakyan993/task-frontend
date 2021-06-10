import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {Container, Table} from 'reactstrap';
import Loader from '../UiComponents/Loader';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from 'react-paginate';
import {orderStatus, userRole} from '../../config';

const OrderComponent = (props) => {

    const [searchParams, setSearchParams] = useState({
        limit: 10,
        offset: 0,
    })
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const id = props.match.params.id;
        props.fetchOrderData(id, searchParams);
    }, []);

    useEffect(() => {
        const id = props.match.params.id;
        props.fetchOrderData(id, searchParams);
    }, [searchParams.offset]);

    const handlePageClick = (selected) => {
        setCurrentPage(selected);
        setSearchParams((prev) => {
            return {
                ...prev,
                offset: selected * prev.limit
            }
        })
    }

    const updateOrderStatus = () => {
        const orderId = props.match.params.id;
        props.changeOrderStatus(orderId);
    }

    const isDisabled = (order) => {
        if (order.status === orderStatus.canceled) {
            return true;
        }
        return order.status !== orderStatus.placed &&
            order.status !== orderStatus.delivered &&
            props.user.role === userRole.buyer
    }

    const renderOrderItems = (orderItems) => {
        return orderItems.map(orderItem => {
            return (
                <tr key={orderItem.id}>
                    <td>{orderItem.price}</td>
                    <td>
                        <FontAwesomeIcon icon={faEye} onClick={() => {props.history.push(`products/${orderItem.productId}`)}}/>
                    </td>
                </tr>
            )
        })
    }

    return (
        props.loading ?
            <Container>
                <Loader />
            </Container>
            :
            <Container>
                <Table>
                    <thead>
                    <tr>
                        <th>price</th>
                        <th>status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {!!props.orderData && !!props.orderData.orderItems && renderOrderItems(props.orderData.orderItems)}
                    </tbody>
                </Table>
                {!!props.orderData && !!props.orderData.count &&
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    initialPage={currentPage}
                    pageCount={Math.ceil(props.orderData.count / searchParams.limit)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={(page) => {
                        handlePageClick(page.selected)
                    }}
                    containerClassName={'pagination'}
                    activeClassName={'active-page'}
                    previousClassName={'previous-page'}
                    nextClassName={'next-page'}
                    disabledClassName={'disable'}
                    breakClassName={'break-me'}
                />}
            </Container>
    )
}

export default withRouter(OrderComponent)