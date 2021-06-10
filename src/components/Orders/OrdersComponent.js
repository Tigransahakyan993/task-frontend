import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {Container, Table, Button} from 'reactstrap';
import Loader from '../UiComponents/Loader';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from 'react-paginate';
import {orderStatus, userRole} from '../../config';

const OrdersComponent = (props) => {
    const [searchParams, setSearchParams] = useState({
        limit: 10,
        offset: 0
    })

    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        props.fetchAllOrders(searchParams);
    }, []);

    useEffect(() => {
        props.fetchAllOrders(searchParams);
    }, [props.message]);

    useEffect(() => {
        props.fetchAllOrders(searchParams);
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

    const updateOrderStatus = (orderId) => {
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

    const renderOrders = (orders) => {
        return orders.map(order => {
            return (
                <tr key={order.id}>
                    <td>{order.price}</td>
                    <td>
                    <Button className='change-button'
                            disabled={isDisabled(order)}
                            onMouseEnter={(e) => {
                                e.target.innerText = props.user.role === userRole.buyer ? 'Cancel' : 'Change';
                            }}
                            onMouseLeave={(e) => {
                                e.target.innerText = order.status;
                            }}
                            onClick={() => {updateOrderStatus(order.id)}}
                    >
                        {order.status}</Button>
                    </td>

                    <td>
                        <FontAwesomeIcon icon={faEye} onClick={() => {props.history.push(`orders/${order.id}`)}}/>
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
                {!!props.orders.data && !!props.orders.data.length && renderOrders(props.orders.data)}
                </tbody>
            </Table>
            {!!props.orders && !!props.orders.count &&
                <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                initialPage={currentPage}
                pageCount={Math.ceil(props.orders.count / searchParams.limit)}
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

export default withRouter(OrdersComponent)