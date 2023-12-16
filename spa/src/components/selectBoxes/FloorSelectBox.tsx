'use client';

import { Floor, FloorWithBuilding } from '@/models/Floor';
import { Form } from 'react-bootstrap';

interface Props {
    data: FloorWithBuilding[] | Floor[];
    setValue?: (val: string) => void;
    selectedValue?: string;
    isLoading: boolean;
    isError: boolean;
    customHandleChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FloorSelectBox = (props: Props) => {
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
    const filteredSelectBox = props.data?.filter((item: FloorWithBuilding | Floor) => item.id !== props?.selectedValue);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (props.setValue) props.setValue(event.target.value);
    };

    const getSelectedValue = (): FloorWithBuilding | Floor => {
        let val = null;
        if (props?.selectedValue) {
            val = props.data.find((item: FloorWithBuilding | Floor) => item.id === props?.selectedValue);
        }

        if (!val) {
            return props.data[0];
        }

        return val;
    };

    return (
        <Form.Select onChange={props.customHandleChange ?? handleChange} id='floor-sb'>
            {props.selectedValue ? ( 
                
                <option value={props.selectedValue} selected>
                    {getSelectedValue()?.code}
                </option>
            ) : (
                <option>select a floor</option>
            )}

            {filteredSelectBox?.map((item: FloorWithBuilding | Floor) => (
                <option key={item.id} value={item.id}>
                    {item.code}
                </option>
            ))}
        </Form.Select>
    );
};

export default FloorSelectBox;
