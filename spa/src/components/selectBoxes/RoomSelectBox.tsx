'use client';

import { RoomWithFloor } from '@/models/Room';
import { useFetchData } from '@/util/customHooks';
import { Form } from 'react-bootstrap';
import config from '../../../config';
import { useEffect } from 'react';

interface Props {
    item?: {
        value?: RoomWithFloor;
    };
    setValue: (val: string) => void;
}

const RoomSelectBox = (props: Props) => {
    const dataFetch = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.rooms);

    // when rooms load, load them to the select box
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
    const filteredSelectBox = dataFetch.data.filter((item: RoomWithFloor) => item.id !== props.item?.value?.id);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setValue(event.target.value);
    };

    return (
        <Form.Select defaultValue={props.item?.value?.id ?? filteredSelectBox[0].id} onChange={handleChange}>
            {props.item?.value?.id && <option defaultChecked={true}>{props.item.value?.number}</option>}

            {filteredSelectBox?.map((item: RoomWithFloor) => (
                <option key={item.id} value={item.id}>
                    {item.number}
                </option>
            ))}
        </Form.Select>
    );
};

export default RoomSelectBox;