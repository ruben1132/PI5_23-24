'use client';

import { Status } from '@/models/Status';
import { Form } from 'react-bootstrap';

interface Props {
    data: Status[];
    setValue: (val: string) => void;
    selectedValue?: string;
}

const StatusSelectBox = (props: Props) => {
    if (!props.data) {
        return (
            <Form.Select>
                <option>No data</option>
            </Form.Select>
        );
    }

    // filter data so it removes the element already selected
    const filteredSelectBox = props.data?.filter((item: Status) => item.value !== props?.selectedValue);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setValue(event.target.value);
    };

    const getSelectedValue = (): Status => {
        let val = null;
        if (props?.selectedValue) {
            val = props.data.find((item: Status) => item.value === props?.selectedValue);
        }

        if (!val) {
            return filteredSelectBox[0];
        }

        return val;
    };

    const selectedValue = getSelectedValue();

    return (
        <Form.Select
            defaultValue={props?.selectedValue ?? filteredSelectBox[0].value}
            onChange={handleChange}
            id="status-sb"
        >
            {props?.selectedValue && <option defaultChecked={true}>{selectedValue.status}</option>}

            {filteredSelectBox?.map((item: Status) => (
                <option key={item.status} value={item.value}>
                    {item.status}
                </option>
            ))}
        </Form.Select>
    );
};

export default StatusSelectBox;
