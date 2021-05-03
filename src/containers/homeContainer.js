import HomeComponent from "../components/HomeComponent/HomeComponent";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getCurrentUser} from '../reducer/auth/auth'

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    token: state.auth.token,
    loading: state.auth.loading,
    trailLoginLoading: state.auth.trailLoginLoading,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getCurrentUser
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeComponent)