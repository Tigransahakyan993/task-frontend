import RegisterComponent from "../components/Settings/RegisterComponent/RegisterComponent";
import {register} from "../reducer/auth/auth";
import { bindActionCreators } from "redux";
import {connect} from "react-redux";

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    message: state.auth.message,
    loading: state.auth.loading,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  register
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterComponent)


