import ProductItemComponent from "../components/Products/ProductItemComponent/ProductItemComponent";
import {addToCart, fetchProductData,} from "../reducer/products";
import { bindActionCreators } from "redux";
import {connect} from "react-redux";

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    productData: {...state.products.productData},
    loading: state.products.loading,
    cart: [...state.products.cart]
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  addToCart,
  fetchProductData,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductItemComponent)