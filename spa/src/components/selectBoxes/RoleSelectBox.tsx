'use client';

import { Role } from '@/models/Role';
import { Form } from 'react-bootstrap';

interface Props {
    data: Role[];
    setValue: (val: string) => void;
    selectedValue?: string;
    isLoading: boolean;
    isError: boolean;
}

const RoleSelectBox = (props: Props) => {
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
    const filteredSelectBox = props.data?.filter((item: Role) => item.id !== props?.selectedValue);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setValue(event.target.value);
    };

    const getSelectedValue = (): Role => {
        let val = null;
        if (props?.selectedValue) {
            val = props.data.find((item: Role) => item.id === props?.selectedValue);
        }

        if (!val) {
            return filteredSelectBox[0];
        }

        return val;
    };

    const selectedValue = getSelectedValue();

    return (
        <Form.Select
            defaultValue={props?.selectedValue ?? filteredSelectBox[0].id}
            onChange={handleChange}
            id="role-sb"
        >
            {props?.selectedValue && (
                <option defaultChecked={true} value={selectedValue.id}>
                    {selectedValue.name}
                </option>
            )}

            {filteredSelectBox?.map((item: Role) => (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            ))}
        </Form.Select>
    );
};

export default RoleSelectBox;
