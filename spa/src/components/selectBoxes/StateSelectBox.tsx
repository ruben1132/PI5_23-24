'use client';

import { Form } from 'react-bootstrap';

// config
import config from '../../../config';

interface Props {
    setValue: (val: string) => void;
    selectedValue?: string;
}

const StateSelectBox = (props: Props) => {
    const data = config.states;

    // filter data so it removes the element already selected
    const filteredSelectBox = data?.filter((item: string) => item !== props?.selectedValue);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setValue(event.target.value);
    };

    const getSelectedValue = (): string => {
        let val = null;
        if (props?.selectedValue) {
            val = data.find((item: string) => item === props?.selectedValue);
        }

        if (!val) {
            return filteredSelectBox[0];
        }

        return val;
    };

    const selectedValue = getSelectedValue();

    return (
        <Form.Select
            defaultValue={props?.selectedValue ?? filteredSelectBox[0]}
            onChange={handleChange}
            id="state-sb"
        >
            {props?.selectedValue && <option defaultChecked={true}>{selectedValue}</option>}

            {filteredSelectBox?.map((item: string) => (
                <option key={item} value={item}>
                    {item}
                </option>
            ))}
        </Form.Select>
    );
};

export default StateSelectBox;
