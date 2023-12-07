import TaskTypeSelectBox from '@/components/selectBoxes/TaskTypeSelectBox';
import '../support/commands';

const taskTypes = [
    {
        id: '1',
        name: 'Task Type 1',
        description: 'Description 1',
    },
    {
        id: '2',
        name: 'Task Type 2',
        description: 'Description 2',
    },
    {
        id: '3',
        name: 'Task Type 3',
        description: 'Description 3',
    },
    {
        id: '4',
        name: 'Task Type 4',
        description: 'Description 4',
    },
    {
        id: '5',
        name: 'Task Type 5',
        description: 'Description 5',
    }
];
describe('<TaskTypeSelectBox/> component', () => {
    it('renders room selectbox', () => {
        cy.mount(<TaskTypeSelectBox data={taskTypes} setValue={(val: string) => {}} isLoading={false} isError={false} />);
    });
    
});
