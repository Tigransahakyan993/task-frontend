import OrderComponent from "../components/Orders/OrderComponent";
import {fetchOrderData, changeOrderStatus} from "../reducer/products";
import { bindActionCreators } from "redux";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        orderData: state.products.orderData,
        loading: state.products.orderLoading,
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchOrderData,
    changeOrderStatus
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrderComponent)