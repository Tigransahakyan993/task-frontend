import RestaurantComponent from "../components/Restaurant/RestaurantComponent/RestaurantComponent";
import {fetchRestaurantData} from "../reducer/restaurant";
import {fetchAllProducts, deleteProduct} from "../reducer/products";
import { bindActionCreators } from "redux";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        restaurant: state.restaurant.data,
        products: {...state.products.products},
        loading: state.restaurant.loading,
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchRestaurantData,
    fetchAllProducts,
    deleteProduct
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RestaurantComponent)