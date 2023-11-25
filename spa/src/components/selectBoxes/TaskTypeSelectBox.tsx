'use client';

import { TaskType } from '@/models/TaskType';
import { useFetchData } from '@/util/customHooks';
import { Form } from 'react-bootstrap';
import config from '../../../config';
import { useEffect } from 'react';

interface Props {
    item?: {
        value?: TaskType;
    };
    setValue?: (val: string) => void;
    customHandleChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TaskTypeSelectBox = (props: Props) => {
    const dataFetch = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.tasktypes);

    // when tasktypes load, load them to the select box
    useEffect(() => {
        // if there's no data, return
        if (!dataFetch.data) {
            return;
        }

        if (!props.setValue) {
            return;
        }

        props.setValue(dataFetch.data[0].id);
    }, [dataFetch.data]);

    if (dataFetch.isLoading) {
        return <Form>Loading...</Form>;
    }
    if (dataFetch.isError) {
        return <Form>Error</Form>;
    }

    // filter data so it removes the element already selected
    const filteredSelectBox = dataFetch.data.filter((item: TaskType) => item.id !== props.item?.value?.id);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (!props.setValue) {
            return;
        }
        
        props.setValue(event.target.value);
    };

    return (
        <Form.Select
            defaultValue={props.item?.value?.id ?? filteredSelectBox[0].id}
            onChange={props.customHandleChange ? props.customHandleChange : handleChange}
        >
            {props.item?.value?.id && <option defaultChecked={true}>{props.item.value.name}</option>}

            {filteredSelectBox?.map((item: TaskType) => (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            ))}
        </Form.Select>
    );
};

export default TaskTypeSelectBox;
