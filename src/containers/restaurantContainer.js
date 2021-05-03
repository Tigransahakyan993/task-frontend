import RestaurantsComponent from "../components/Restaurant/RestaurantsComponent/RestaurantsComponent";
import {fetchRestaurantData, fetchAllRestaurants} from "../reducer/restaurant";
import { bindActionCreators } from "redux";
import {connect} from "react-redux";

const mapStateToProps = state => {
  return {
    restaurants: state.restaurant.restaurants,
    data: state.restaurant.data,
    loading: state.restaurant.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAllRestaurants,
  fetchRestaurantData
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestaurantsComponent)