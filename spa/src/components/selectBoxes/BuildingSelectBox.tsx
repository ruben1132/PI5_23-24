'use client';

import { Building } from '@/models/Building';
import { Form } from 'react-bootstrap';

interface Props {
    disabled?: boolean;
    data: Building[];
    setValue: (val: string) => void;
    selectedValue?: string;
    isLoading: boolean;
    isError: boolean;
}

const BuildingSelectBox = (props: Props) => {
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

    if (!props.data) {
        return (
            <Form.Select>
                <option>No data</option>
            </Form.Select>
        );
    }

    // filter data so it removes the element already selected
    const filteredSelectBox = props.data?.filter((item: Building) => item.id !== props?.selectedValue);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setValue(event.target.value);
    };

    const getSelectedValue = (): Building => {
        if (props?.selectedValue) {
            return props.data.find((item: Building) => item.id === props?.selectedValue);
        }

        props.setValue(filteredSelectBox[0].id);
        return filteredSelectBox[0];
    };

    const selectedValue = getSelectedValue();

    return (
        <Form.Select
            defaultValue={props?.selectedValue ?? filteredSelectBox[0].id}
            onChange={handleChange}
            id="building-sb"
            disabled={props.disabled}
        >
            {props?.selectedValue && (
                <option defaultChecked={true} value={selectedValue.id}>
                    {selectedValue.code + ' - ' + selectedValue.name}
                </option>
            )}

            {filteredSelectBox?.map((item: Building) => (
                <option key={item.id} value={item.id}>
                    {item.code + ' - ' + item.name}
                </option>
            ))}
        </Form.Select>
    );
};

export default BuildingSelectBox;
