import OrdersComponent from "../components/Orders/OrdersComponent";
import {fetchAllOrders, changeOrderStatus} from "../reducer/products";
import { bindActionCreators } from "redux";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        orders: {...state.products.orders},
        orderData: state.products.orderData,
        loading: state.products.orderLoading,
        message: state.products.message
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchAllOrders,
    changeOrderStatus
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrdersComponent)