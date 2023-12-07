import BuildingSelectBox from '@/components/selectBoxes/BuildingSelectBox';
import '../support/commands';

const buildings = [
    {
        id: '1',
        code: 'A',
        name: 'ed A',
        dimensions: '10x10',
    },
    {
        id: '2',
        code: 'B',
        name: 'ed B',
        dimensions: '10x10',
    },
    {
        id: '3',
        code: 'C',
        name: 'ed C',
        dimensions: '10x10',
    },
];
describe('<BuildingSelectBox/> component', () => {
    it('renders room selectbox', () => {
        cy.mount(<BuildingSelectBox data={buildings} setValue={(val: string) => {}} isLoading={false} isError={false} />);
    });

    it('renders select box with selected value', () => {
        cy.mount(
            <BuildingSelectBox
                data={buildings}
                setValue={(val: string) => {}}
                isLoading={false}
                isError={false}
                selectedValue="2"
            />,
        );

        cy.get('[id="building-sb"]').should('have.value', 'B - ed B');
    });
});
