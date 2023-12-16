'use client';

import { User } from '@/models/User';
import { Form } from 'react-bootstrap';

interface Props {
    data: User[];
    setValue: (val: string) => void;
    selectedValue?: string;
    isLoading: boolean;
    isError: boolean;
}

const UserSelectBox = (props: Props) => {
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
    const filteredSelectBox = props.data?.filter((item: User) => item.id !== props?.selectedValue);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setValue(event.target.value);
    };

    const getSelectedValue = (): User => {
        let val = null;
        if (props?.selectedValue) {
            val = props.data.find((item: User) => item.id === props?.selectedValue);
        }

        return val;
    };

    const selectedValue = getSelectedValue();

    return (
        <Form.Select
            defaultValue={props?.selectedValue ?? filteredSelectBox[0].id}
            onChange={handleChange}
            id="user-sb"
        >
            {props?.selectedValue ? (
                <option defaultChecked={true} value={selectedValue.id}>
                    {selectedValue.name}
                </option>
            ) : (
                <option defaultChecked={true} value={""}>
                    select a user
                </option>
            )}

            {filteredSelectBox?.map((item: User) => (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            ))}
        </Form.Select>
    );
};

export default UserSelectBox;
