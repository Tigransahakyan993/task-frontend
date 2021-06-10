import AddEditProductModal from "../components/Products/AddEditProductModal";
import {updateProduct, createProduct} from "../reducer/products";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const mapDispatchToProps = (dispatch) => bindActionCreators({
    updateProduct,
    createProduct
}, dispatch)

export default connect(
    null,
    mapDispatchToProps
)(AddEditProductModal)