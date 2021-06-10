import React, {useState, useEffect} from 'react';
import Modal from '@material-ui/core/Modal';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {InputFiled} from '../UiComponents';
import Loader from '../UiComponents/Loader';
import {Container, Col, Button} from "reactstrap";
import {withRouter} from 'react-router-dom';

const AddEditProductModal = (props) => {
    const {productData} = props;

    const [fields, setFields] = useState({
        name: '',
        description: '',
        price: ''
    });
    const [required, setRequired] = useState({
        name: '',
        description: '',
        price: ''
    });

    const onFiledValueChange = (name, value) => {
        setFields((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleSubmit = () => {
        let isRequired = false;

        if (!fields.name) {
            isRequired = true;
            setRequired((prev) => {
                return {
                    ...prev,
                    name: 'required'
                }
            })
        }
        if (!fields.price) {
            isRequired = true;
            setRequired((prev) => {
                return {
                    ...prev,
                    price: 'required'
                }
            })
        }
        if (!fields.description) {
            isRequired = true;
            setRequired((prev) => {
                return {
                    ...prev,
                    description: 'required'
                }
            })
        }
        
        if (!isRequired) {
            !!props.productData ? props.updateProduct({...fields, id: productData.id}) : props.createProduct(fields);
            onCloseModal()
        }
    }

    const onCloseModal = () => {
        setRequired({
            name: '',
            description: '',
            price: '',
        });
        setFields({
            name: '',
            description: '',
            price: '',
        });
        props.toggle()
    }

    useEffect(() => {
        if (props.isOpen && productData) {
            setFields({
                name: productData.name,
                description: productData.description,
                price: productData.price,
            });
        }
    }, [props.isOpen])

    return(
        !!props.loading ?
        <Container>
            <Loader />
        </Container> :
            <Container>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    open={props.isOpen}
                >
                   <Col className='modal-body'>
                       <Col className='mb-3'>
                           <InputFiled
                               value={fields.name}
                               type={'text'}
                               label={'name'}
                               placeholder={'Name'}
                               onChange={(e) => {onFiledValueChange('name', e.target.value)}}
                               required={required.name}
                               isRequired
                           />
                       </Col>
                       <Col className='mb-3'>
                           <InputFiled
                               value={fields.price}
                               type={'text'}
                               label={'price'}
                               placeholder={'Price'}
                               onChange={(e) => {onFiledValueChange('price', e.target.value)}}
                               required={required.price}
                               isRequired
                           />
                       </Col>
                       <Col className='mb-3'>
                           <InputFiled
                               value={fields.description || ''}
                               type={'text'}
                               label={'description'}
                               placeholder={'Description'}
                               onChange={(e) => {onFiledValueChange('description', e.target.value)}}
                               required={required.description}
                               isRequired
                           />
                       </Col>
                       <Button onClick={() => { handleSubmit() }}>
                           {props.productData ? 'Edit' : 'Add'}
                       </Button>
                       <Button color='danger' onClick={onCloseModal} className='modal-close-button'>{<FontAwesomeIcon icon={faTimes}/> }</Button>
                   </Col>
                </Modal>
            </Container>

    )
}

export default withRouter(AddEditProductModal)