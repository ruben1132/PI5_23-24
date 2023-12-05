'use client';

import Modal from 'react-bootstrap/Modal';
import { RenderFilteredForm } from '../forms/RenderFilteredForm';

interface Props {
    action: string;
    fade: boolean;
    show: boolean;
    item: {
        value: any;
        type: string;
    };
    close: () => void;
    reFetchData: () => void;
}

export default function ModalGeneric(props: Props) {
    return (
        <Modal size="lg" onHide={props.close} show={props.show}>
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    {props.action === 'edit' ? 'Edit ' + props.item.type : 'Add ' + props.item.type}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RenderFilteredForm
                    item={{
                        value: props.item.value ? props.item.value : null,
                        type: props.item.type,
                    }}
                    action={props.action}
                    reFetchData={props.reFetchData}
                    close={props.close}
                />
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    );
}
