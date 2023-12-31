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
    allOption?: boolean;
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

    const getSelectedValue = (): TaskType => {
        let val = null;
        if (props?.selectedValue) {
            val = props.data.find((item: TaskType) => item.id === props?.selectedValue);
        }

        if (!val) {
            return filteredSelectBox[0];
        }

        return val;
    };

    return (
        <Form.Select onChange={props.customHandleChange ?? handleChange} id="taskType-sb">
            {props.selectedValue ? (
                <option defaultChecked={true}>{getSelectedValue().name}</option>
            ) : (
                <option value={''}>select task types</option>
            )}

            {filteredSelectBox?.map((item: TaskType) => (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            ))}
            {props.allOption && <option value={''}>All</option>}
        </Form.Select>
    );
};

export default TaskTypeSelectBox;
