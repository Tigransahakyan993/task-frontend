import LogIn from "../components/Settings/LoginComponent/LoginComponent";
import {login} from "../reducer/auth/auth";
import { bindActionCreators } from "redux";
import {connect} from "react-redux";

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    token: state.auth.token,
    loading: state.auth.loading,
    login: state.auth.login,
    message: state.auth.message,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  login
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogIn)


