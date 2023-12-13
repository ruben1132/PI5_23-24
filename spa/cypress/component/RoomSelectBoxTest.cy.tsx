import RoomSelectBox from '@/components/selectBoxes/RoomSelectBox';
import '../support/commands';

const rooms = [
    {
        id: '1',
        number: 'room',
        floor: {
            id: '1',
            code: 'floor',
            number: 1,
            information: 'info test',
            building: 'building',
        },
    },
    {
        id: '2',
        number: 'room2',
        floor: {
            id: '2',
            code: 'floor2',
            number: 2,
            information: 'info test2',
            building: 'building2',
        },
    },
    {
        id: '3',
        number: 'room3',
        floor: {
            id: '3',
            code: 'floor3',
            number: 3,
            information: 'info test3',
            building: 'building3',
        },
    },
];

describe('<RoomSelectBox/> component', () => {
    it('renders room selectbox', () => {
        cy.mount(
            <RoomSelectBox
                data={rooms}
                setValue={(val: string) => {}}
                isLoading={false}
                isError={false}
            />,
        );

    });

    it('renders select box with selected value', () => {
        cy.mount(
            <RoomSelectBox
                data={rooms}
                setValue={(val: string) => {}}
                isLoading={false}
                isError={false}
                selectedValue="2"
            />,
        );

        cy.get('[id="room-sb"]').should('have.value', 'room2');
    });
});
