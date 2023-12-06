
import ModalGeneric from '@/components/modals/Modal';

describe('<ModalGeneric/> component', () => {
    it('renders building form', () => {
     
      cy.mount(<ModalGeneric  
        action='add'
        fade={true}
        show={true}
        item={{
            value: null,
            type: 'building'
        }}
        close={() => {}}
        reFetchData={() => {}}
        />)

        cy.get('Add building').should('exist')

    });
});
