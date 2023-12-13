import RobotTypeSelectBox from '@/components/selectBoxes/RobotTypeSelectBox';
import '../support/commands';

const robotTypes = [
    {
        id: '1',
        type: 'Type A',
        brand: 'Brand A',
        model: 'Model A',
        tasksAllowed: [
            {
                id: '1',
                name: 'Task A',
                description: 'Description A',
            },
        ],
    },
    {
        id: '2',
        type: 'Type B',
        brand: 'Brand B',
        model: 'Model B',
        tasksAllowed: [
            {
                id: '2',
                name: 'Task B',
                description: 'Description B',
            },
        ],
    },
    {
        id: '3',
        type: 'Type C',
        brand: 'Brand C',
        model: 'Model C',
        tasksAllowed: [
            {
                id: '3',
                name: 'Task C',
                description: 'Description C',
            },
        ],
    },
];
describe('<RobotTypeSelectBox/> component', () => {
    it('renders room selectbox', () => {
        cy.mount(
            <RobotTypeSelectBox data={robotTypes} setValue={(val: string) => {}} isLoading={false} isError={false} />,
        );
    });

    it('renders select box with selected value', () => {
        cy.mount(
            <RobotTypeSelectBox
                data={robotTypes}
                setValue={(val: string) => {}}
                isLoading={false}
                isError={false}
                selectedValue="3"
            />,
        );

        cy.get('[id="robotType-sb"]').should('have.value', '3');
    });
});
