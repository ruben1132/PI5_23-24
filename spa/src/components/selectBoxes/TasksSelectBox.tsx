'use client';

import { TaskWithUser } from '@/models/Task';
import { Form } from 'react-bootstrap';

interface Props {
    disabled?: boolean;
    data: TaskWithUser[];
    setValue: (val: string) => void;
    selectedValue?: string;
    isLoading: boolean;
    isError: boolean;
}

const TaskSelectBox = (props: Props) => {
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
    const filteredSelectBox = props.data?.filter((item: TaskWithUser) => item.id !== props?.selectedValue);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setValue(event.target.value);
    };

    const getSelectedValue = (): TaskWithUser => {
        let val = null;
        if (props?.selectedValue) {
            val = props.data.find((item: TaskWithUser) => item.id === props?.selectedValue);
        }

        // if (!val) {
        //     return filteredSelectBox[0];
        // }

        return val;
    };

    const selectedValue = getSelectedValue();

    return (
        <Form.Select defaultValue={props?.selectedValue} onChange={handleChange} id="task-sb" disabled={props.disabled}>
            {props?.selectedValue ? (
                <option defaultChecked={true}>
                    {selectedValue.taskType + ' - ' + selectedValue.user.name + ' - ' + selectedValue.lastUpdated}
                </option>
            ) : (
                <option defaultChecked={true}>Select a task</option>
            )}

            {filteredSelectBox?.map((item: TaskWithUser) => (
                <option key={item.id} value={item.id}>
                    {item.taskType} {' - ' + item.user.name} {' - ' + item.lastUpdated}
                </option>
            ))}
        </Form.Select>
    );
};

export default TaskSelectBox;
