import 'react-toastify/dist/ReactToastify.css';

import ModalGeneric from '@/components/modals/Modal';
import Notification from '@/components/notification/Notification';

import '../support/commands';

describe('<ModalGeneric/> component', () => {

    it('renders building form', () => {
        cy.mount(<Notification />);
        cy.mount(
            <ModalGeneric
                action="add"
                fade={false}
                show={true}
                item={{
                    value: null,
                    type: 'test',
                }}
                close={() => {}}
                reFetchData={() => {}}
            />,
        );

        // cy.get('Add test').should('exist')
    });
});
