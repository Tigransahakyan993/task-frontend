import HeaderComponent from "../components/HeaderComponent/HeaderComponent";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchSearchingList} from "../reducer/restaurant";

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    login: state.auth.login,
    cart: [...state.products.cart],
    searchingList: [...state.restaurant.searchingList],
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSearchingList,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderComponent)