import FloorSelectBox from '@/components/selectBoxes/FloorSelectBox';
import '../support/commands';

const floors = [
    {
        id: '1',
        code: 'floor',
        number: 1,
        information: 'info test',
        building: {
            id: '1',
            code: 'A',
            name: 'ed A',
            dimensions: '10x10',
        },
    },
    {
        id: '2',
        code: 'floor2',
        number: 2,
        information: 'info test2',
        building: {
            id: '2',
            code: 'B',
            name: 'ed B',
            dimensions: '10x10',
        },
    },
    {
        id: '3',
        code: 'floor3',
        number: 3,
        information: 'info test3',
        building: {
            id: '3',
            code: 'C',
            name: 'ed C',
            dimensions: '10x10',
        },
    },
]
describe('<FloorSelectBox/> component', () => {
    it('renders room selectbox', () => {
        cy.mount(
            <FloorSelectBox
                data={floors}
                setValue={(val: string) => {}}
                isLoading={false}
                isError={false}
            />,
        );
    });

    it('renders select box with selected value', () => {
        cy.mount(
            <FloorSelectBox
                data={floors}
                setValue={(val: string) => {}}
                isLoading={false}
                isError={false}
                selectedValue="2"
            />,
        );

        cy.get('[id="floor-sb"]').should('have.value', '2');
    });
});
