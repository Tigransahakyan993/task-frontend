import React from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faCheck} from "@fortawesome/free-solid-svg-icons";

const ConfirmModal = (props) => {
    const {
        toggle,
        isOpen,
        check
    } = props;

    return (
            <Modal isOpen={isOpen} toggle={toggle} className='button'>
                <ModalHeader toggle={toggle}>Delete this product ?</ModalHeader>
                <ModalFooter>
                    <Button color="primary" onClick={check}><FontAwesomeIcon icon={faCheck}/></Button>{' '}
                    <Button color="secondary" onClick={toggle}><FontAwesomeIcon icon={faTimes}/></Button>
                </ModalFooter>
            </Modal>
    );
}

export default ConfirmModal;