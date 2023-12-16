'use client';

import { ElevatorWithFloors } from '@/models/Elevator';
import { useEffect } from 'react';
import { Form } from 'react-bootstrap';

interface Props {
    disabled?: boolean;
    data: ElevatorWithFloors[];
    setValue: (val: string) => void;
    selectedValue?: string;
    isLoading: boolean;
    isError: boolean;
    setObj: (val: ElevatorWithFloors) => void;
}

const ElevatorSelectBox = (props: Props) => {

    
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

    if(!props.data) {
        return (
            <Form.Select>
                <option>No data</option>
            </Form.Select>
        );
    }

    // filter data so it removes the element already selected
    const filteredSelectBox = props.data?.filter((item: ElevatorWithFloors) => item.id !== props?.selectedValue);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setValue(event.target.value);
        const selectedElevator = filteredSelectBox.find((item: ElevatorWithFloors) => item.id === event.target.value);
        
        if (selectedElevator) {            
            props.setObj(selectedElevator);
        }
    };

    const getSelectedValue = (): ElevatorWithFloors => {
        let val = null;
        if (props?.selectedValue) {
            val = props.data.find((item: ElevatorWithFloors) => item.id === props?.selectedValue);
        }

        if (!val) {
            return filteredSelectBox[0];
        }

        return val;
    };

    useEffect(() => {
        if (props?.selectedValue) {            
            const selectedElevator = props.data.find((item: ElevatorWithFloors) => item.id === props?.selectedValue);
            if (selectedElevator) {
                props.setObj(selectedElevator);
            }else{
                props.setObj(props.data[0]);
            }
        }
    }
    , []);
    
    return (
        <Form.Select defaultValue={props?.selectedValue ?? filteredSelectBox[0].id} onChange={handleChange} id='elevator-sb' disabled={props.disabled}>
            {props?.selectedValue && <option defaultChecked={true} value={props.selectedValue}>{getSelectedValue().designation}</option>}

            {filteredSelectBox?.map((item: ElevatorWithFloors) => (
                <option key={item.id} value={item.id}>
                    {item.designation}
                </option>
            ))}
        </Form.Select>
    );
};

export default ElevatorSelectBox;
