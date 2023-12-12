'use client';

import { PassageWithFloor } from '@/models/Passage';
import { Form } from 'react-bootstrap';

interface Props {
    data: PassageWithFloor[];
    setValue: (val: string) => void;
    selectedValue?: string;
    isLoading: boolean;
    isError: boolean;
}

const PassageSelectBox = (props: Props) => {

    
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
    const filteredSelectBox = props.data?.filter((item: PassageWithFloor) => item.id !== props?.selectedValue);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setValue(event.target.value);
    };

    const getSelectedValue = (): PassageWithFloor => {
        let val = null;
        if (props?.selectedValue) {
            val = props.data.find((item: PassageWithFloor) => item.id === props?.selectedValue);
        }

        if (!val) {
            return filteredSelectBox[0];
        }

        return val;
    };

    return (
        <Form.Select defaultValue={props?.selectedValue ?? filteredSelectBox[0].id} onChange={handleChange} id='passage-sb'>
            {props?.selectedValue && <option defaultChecked={true}>{getSelectedValue().designation}</option>}

            {filteredSelectBox?.map((item: PassageWithFloor) => (
                <option key={item.id} value={item.id}>
                    {item.designation}
                </option>
            ))}
        </Form.Select>
    );
};

export default PassageSelectBox;