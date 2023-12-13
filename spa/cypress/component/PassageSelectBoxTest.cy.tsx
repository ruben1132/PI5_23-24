import PassageSelectBox from '@/components/selectBoxes/PassageSelectBox';
import '../support/commands';

const passages = [
    {
        id:'1',
        designation: 'a2 <--> b2',
        fromFloor: {
            id: 'floora2',
            code: 'a2',
            number: 1,
            information: 'floor a2',
            building: 'buildingA',
        },
        toFloor: {
            id: 'floorb2',
            code: 'b2',
            number: 2,
            information: 'floor b2',
            building: 'buildingB',
        },
    },
    {
        id:'2',
        designation: 'a3 <--> b3',
        fromFloor: {
            id: 'floora3',
            code: 'a3',
            number: 1,
            information: 'floor a3',
            building: 'buildingA',
        },
        toFloor: {
            id: 'floorb3',
            code: 'b3',
            number: 2,
            information: 'floor b3',
            building: 'buildingB',
        },
    },
    {
        id:'3',
        designation: 'a4 <--> b4',
        fromFloor: {
            id: 'floora4',
            code: 'a4',
            number: 1,
            information: 'floor a4',
            building: 'buildingA',
        },
        toFloor: {
            id: 'floorb4',
            code: 'b4',
            number: 2,
            information: 'floor b4',
            building: 'buildingB',
        },
    },
];
describe('<PassageSelectBox/> component', () => {
    it('renders room selectbox', () => {
        cy.mount(<PassageSelectBox data={passages} setValue={(val: string) => {}} isLoading={false} isError={false} />);
    });

    it('renders select box with selected value', () => {
        cy.mount(
            <PassageSelectBox
                data={passages}
                setValue={(val: string) => {}}
                isLoading={false}
                isError={false}
                selectedValue="2"
            />,
        );

        cy.get('[id="passage-sb"]').should('have.value', 'a3 <--> b3');
    });
});
