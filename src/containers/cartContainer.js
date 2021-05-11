import CartComponent from "../components/CartComponent/CartComponent";
import {addToCart, deleteWithCart, createOrder} from "../reducer/products";
import { bindActionCreators } from "redux";
import {connect} from "react-redux";

const mapStateToProps = state => {
  return {
    cart: [...state.products.cart],
    loading: state.restaurant.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  addToCart,
  createOrder,
  deleteWithCart,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CartComponent)