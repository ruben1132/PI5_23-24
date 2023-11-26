'use client';

import { Floor, FloorWithBuilding } from '@/models/Floor';
import { useFetchData } from '@/util/customHooks';
import { Form } from 'react-bootstrap';
import config from '../../../config';
import { useEffect } from 'react';

interface Props {
    item?: {
        value?: FloorWithBuilding | null;
    };
    setValue: (val: string) => void;
    buildingId?: string;
    defaultData?: Floor[];
}

const FloorSelectBox = (props: Props) => {
    const ofBuilding = props.buildingId ? 'buildingId=' + props.buildingId : '';
    const dataFetch = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.floors + ofBuilding);

    // when floors load, load them to the select box
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
    let filteredSelectBox = null;
    if (props.defaultData) {
        filteredSelectBox = props.defaultData.filter((item: Floor) => item.id !== props.item?.value?.id);
    } else {
        filteredSelectBox = dataFetch.data.filter((item: FloorWithBuilding) => item.id !== props.item?.value?.id);
    }

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setValue(event.target.value);
    };

    return (
        <Form.Select defaultValue={props.item?.value?.id ?? filteredSelectBox[0].id} onChange={handleChange}>
            {props.item?.value?.id && <option defaultChecked={true}>{props.item?.value?.code}</option>}

            {filteredSelectBox?.map((item: FloorWithBuilding) => (
                <option key={item.id} value={item.id}>
                    {item.code}
                </option>
            ))}
        </Form.Select>
    );
};

export default FloorSelectBox;
