import HeaderComponent from "../components/HeaderComponent/HeaderComponent";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    login: state.auth.login,
    cart: [...state.products.cart],
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderComponent)