'use client';

import { TaskType } from '@/models/TaskType';
import { Form } from 'react-bootstrap';

interface Props {
    data: TaskType[];
    setValue?: (val: string) => void;
    selectedValue?: string;
    isLoading: boolean;
    isError: boolean;
    customHandleChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TaskTypeSelectBox = (props: Props) => {
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
    const filteredSelectBox = props.data?.filter((item: TaskType) => item.id !== props?.selectedValue);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (props.setValue) {
            props.setValue(event.target.value);
            return;
        }
    };


    return (
        <Form.Select
            onChange={props.customHandleChange ?? handleChange}
            id='taskType-sb'
        >
            <option value={""}>select task types</option>

            {filteredSelectBox?.map((item: TaskType) => (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            ))}
        </Form.Select>
    );
};

export default TaskTypeSelectBox;
