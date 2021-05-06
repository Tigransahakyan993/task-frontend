import RestaurantCarouselComponent from "../components/Restaurant/RestaurantCarouselComponent/RestaurantCarouselComponent";
import {fetchRestaurantData} from "../reducer/restaurant";
import {fetchAllProducts} from "../reducer/products";
import { bindActionCreators } from "redux";
import {connect} from "react-redux";

const mapStateToProps = state => {
  return {
    restaurantData: state.restaurant.data,
    loading: state.restaurant.loading,
    message: state.restaurant.message,
    products: state.products.products
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchRestaurantData,
  fetchAllProducts
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestaurantCarouselComponent)