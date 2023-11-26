'use client';

import { RobotTypeWithTaskTypes } from '@/models/RobotType';
import { useFetchData } from '@/util/customHooks';
import { Form } from 'react-bootstrap';
import config from '../../../config';
import { useEffect } from 'react';

interface Props {
    item?: {
        value?: RobotTypeWithTaskTypes | null;
    };
    setValue: (val: string) => void;
}

const RobotTypeSelectBox = (props: Props) => {
    const dataFetch = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.robottypes);

    // when robotTypes load, load them to the select box
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
    const filteredSelectBox = dataFetch.data.filter((item: RobotTypeWithTaskTypes) => item.id !== props.item?.value?.id);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setValue(event.target.value);
    };

    return (
        <Form.Select defaultValue={props.item?.value?.id ?? filteredSelectBox[0].id} onChange={handleChange}>
            {props.item?.value?.id && <option defaultChecked={true}>{props.item?.value?.type}</option>}

            {filteredSelectBox?.map((item: RobotTypeWithTaskTypes) => (
                <option key={item.id} value={item.id}>
                    {item.type}
                </option>
            ))}
        </Form.Select>
    );
};

export default RobotTypeSelectBox;