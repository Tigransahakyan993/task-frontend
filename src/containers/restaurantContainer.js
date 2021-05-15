import RestaurantComponent from "../components/Restaurant/RestaurantComponent/RestaurantComponent";
import {fetchRestaurantData} from "../reducer/restaurant";
import {fetchAllProducts} from "../reducer/products";
import { bindActionCreators } from "redux";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        data: state.restaurant.data,
        products: state.products.products,
        loading: state.restaurant.loading,
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchRestaurantData,
    fetchAllProducts
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RestaurantComponent)