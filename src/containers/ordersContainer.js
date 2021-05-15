import OrderComponent from "../components/Orders/OrdersComponent";
import {fetchAllOrders} from "../reducer/products";
import { bindActionCreators } from "redux";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        orders: state.products.orders,
        orderData: state.products.orderData,
        loading: state.products.orderLoading
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchAllOrders
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrderComponent)