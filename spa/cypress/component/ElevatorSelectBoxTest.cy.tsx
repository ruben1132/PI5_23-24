import ElevatorSelectBox from '@/components/selectBoxes/ElevatorSelectBox';
import '../support/commands';

const elevators = [
    {
        id: '1',
        designation: 'Building A elevator',
        floorsAllowed: [
            {
                id: 'floor1',
                code: 'f1',
                number: 1,
                information: 'floor 1',
                building: 'building1',
            },
        ],
    },
    {
        id: '2',
        designation: 'Building B elevator',
        floorsAllowed: [
            {
                id: 'floor2',
                code: 'f2',
                number: 2,
                information: 'floor 2',
                building: 'building2',
            },
        ],
    },
    {
        id: '3',
        designation: 'Building C elevator',
        floorsAllowed: [
            {
                id: 'floor3',
                code: 'f3',
                number: 3,
                information: 'floor 3',
                building: 'building3',
            },
        ],
    },
];
describe('<ElevatorSelectBox/> component', () => {
    it('renders room selectbox', () => {
        cy.mount(
            <ElevatorSelectBox
                data={elevators}
                setValue={(val: string) => {}}
                isLoading={false}
                isError={false}
                setObj={(val: any) => {}}
            />,
        );
    });

    it('renders select box with selected value', () => {
        cy.mount(
            <ElevatorSelectBox
                data={elevators}
                setValue={(val: string) => {}}
                isLoading={false}
                isError={false}
                setObj={(val: any) => {}}
                selectedValue="2"
            />,
        );

        cy.get('[id="elevator-sb"]').should('have.value', '2');
    });
});
