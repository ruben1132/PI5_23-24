'use client';

import { ElevatorWithFloors } from '@/models/Elevator';
import { useFetchData } from '@/util/customHooks';
import { Form } from 'react-bootstrap';
import config from '../../../config';
import { useEffect } from 'react';

interface Props {
    item?: {
        value?: ElevatorWithFloors | null;
    };
    setValue: (val: string) => void;
    setObjValue?: (val: ElevatorWithFloors) => void;
}

const ElevatorSelectBox = (props: Props) => {
    const dataFetch = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.elevators);

    // when elevators load, load them to the select box
    useEffect(() => {
        // if there's no data, return
        if (!dataFetch.data) {
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
    const filteredSelectBox = dataFetch.data.filter((item: ElevatorWithFloors) => item.id !== props.item?.value?.id);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setValue(event.target.value);

        if (props.setObjValue) {
            const obj = dataFetch.data.find((item: ElevatorWithFloors) => item.id === event.target.value);
            props.setObjValue(obj);
        }
    };

    return (
        <Form.Select defaultValue={props.item?.value?.id ?? filteredSelectBox[0].id} onChange={handleChange}>
            {props.item?.value?.id && <option defaultChecked={true}>{props.item.value?.designation}</option>}

            {filteredSelectBox?.map((item: ElevatorWithFloors) => (
                <option key={item.id} value={item.id}>
                    {item.designation}
                </option>
            ))}
        </Form.Select>
    );
};

export default ElevatorSelectBox;