'use client';

import { RobotTypeWithTaskTypes } from '@/models/RobotType';
import { Form } from 'react-bootstrap';

interface Props {
    data: RobotTypeWithTaskTypes[];
    setValue: (val: string) => void;
    selectedValue?: string;
    isLoading: boolean;
    isError: boolean;
}

const RobotTypeWithTaskTypesSelectBox = (props: Props) => {

    
    if (props.isError) {
        return (
            <Form.Select>
                <option>Error</option>
            </Form.Select>
        );
    }
    if (props.isLoading) {
        return (
            <Form.Select>
                <option>Loading...</option>
            </Form.Select>
        );
    }

    if(!props.data) {
        return (
            <Form.Select>
                <option>No data</option>
            </Form.Select>
        );
    }

    // filter data so it removes the element already selected
    const filteredSelectBox = props.data?.filter((item: RobotTypeWithTaskTypes) => item.id !== props?.selectedValue);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setValue(event.target.value);
    };

    const getSelectedValue = (): RobotTypeWithTaskTypes => {
        let val = null;
        if (props?.selectedValue) {
            val = props.data.find((item: RobotTypeWithTaskTypes) => item.id === props?.selectedValue);
        }

        if (!val) {
            return filteredSelectBox[0];
        }

        return val;
    };

    return (
        <Form.Select defaultValue={props?.selectedValue ?? filteredSelectBox[0].id} onChange={handleChange}>
            {props?.selectedValue && <option defaultChecked={true}>{getSelectedValue().type}</option>}

            {filteredSelectBox?.map((item: RobotTypeWithTaskTypes) => (
                <option key={item.id} value={item.id}>
                    {item.type}
                </option>
            ))}
        </Form.Select>
    );
};

export default RobotTypeWithTaskTypesSelectBox;
