'use client';

import { RoomWithFloor } from '@/models/Room';
import { Form } from 'react-bootstrap';

interface Props {
    disabled?: boolean;
    data: RoomWithFloor[];
    setValue: (val: string) => void;
    selectedValue?: string;
    isLoading: boolean;
    isError: boolean;
}

const RoomSelectBox = (props: Props) => {

    
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
    const filteredSelectBox = props.data?.filter((item: RoomWithFloor) => item.id !== props?.selectedValue);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setValue(event.target.value);
    };

    const getSelectedValue = (): RoomWithFloor => {
        let val = null;
        if (props?.selectedValue) {
            val = props.data.find((item: RoomWithFloor) => item.id === props?.selectedValue);
        }

        if (!val) {
            return filteredSelectBox[0];
        }

        return val;
    };

    return (
        <Form.Select defaultValue={props?.selectedValue ?? filteredSelectBox[0].id} onChange={handleChange} id='room-sb' disabled={props.disabled}>
            {props?.selectedValue && <option defaultChecked={true}>{getSelectedValue().number}</option>}

            {filteredSelectBox?.map((item: RoomWithFloor) => (
                <option key={item.id} value={item.id}>
                    {item.number}
                </option>
            ))}
        </Form.Select>
    );
};

export default RoomSelectBox;
