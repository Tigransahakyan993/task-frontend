import ProductComponent from "../components/Products/ProductComponent/ProductComponent";
import {addToCart} from "../reducer/products";
import { bindActionCreators } from "redux";
import {connect} from "react-redux";

const mapStateToProps = state => {
  return {
    products: state.products.products,
    loading: state.restaurant.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  addToCart
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductComponent)