import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {Container, Table, Button} from 'reactstrap';
import Loader from '../UiComponents/Loader';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye} from "@fortawesome/free-solid-svg-icons";

const OrdersComponent = (props) => {
    useEffect(() => {
        props.fetchAllOrders();
    }, []);

    const renderOrderItems = (orders) => {
        return orders.map(order => {
            return (
                <tr>
                    <td>{order.price}</td>
                    <td>{order.status}</td>
                    <td>
                        <Button disabled={false}>{order.status}</Button>
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
                {!!props.orders && !!props.orders.length && renderOrderItems(props.orders)}
                </tbody>
            </Table>
        </Container>
    )
}

export default withRouter(OrdersComponent)