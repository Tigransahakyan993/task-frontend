import SettingsComponent from "../components/Settings";
import {logout} from "../reducer/auth/auth";
import { bindActionCreators } from "redux";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        loading: state.auth.loading
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    logout,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SettingsComponent)