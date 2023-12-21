'use client';

import Modal from 'react-bootstrap/Modal';

interface Props {
    fade: boolean;
    show: boolean;
    title: string;
    body: React.ReactNode;
    footer: React.ReactNode;
    close: () => void;

}

export default function ModalMisc(props: Props) {
    return (
        <Modal size="lg" onHide={props.close} show={props.show}>
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                 {props.body}
            </Modal.Body>
            <Modal.Footer>
                {props.footer}
            </Modal.Footer>
        </Modal>
    );
}
