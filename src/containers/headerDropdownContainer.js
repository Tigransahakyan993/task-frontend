import HeaderDropdownComponent from "../components/HeaderComponent/DropdownMenu/HeaderDropdownComponent";
import {connect} from "react-redux";

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}

export default connect(
  mapStateToProps,
  null,
)(HeaderDropdownComponent)