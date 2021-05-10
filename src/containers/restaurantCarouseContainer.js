import RestaurantCarouselComponent from "../components/Restaurant/RestaurantCarouselComponent/RestaurantCarouselComponent";
import {fetchRestaurantData} from "../reducer/restaurant";
import {fetchAllProducts, addToCart} from "../reducer/products";
import { bindActionCreators } from "redux";
import {connect} from "react-redux";

const mapStateToProps = state => {
  return {
    restaurantData: state.restaurant.data,
    loading: state.restaurant.loading,
    message: state.restaurant.message,
    products: state.products.products,
    cart: [...state.products.cart]
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchRestaurantData,
  fetchAllProducts,
  addToCart
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestaurantCarouselComponent)