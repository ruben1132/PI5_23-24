"use client";

// react
import React, { ChangeEvent, useEffect, useState } from "react";

// react bootstrap components
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";

// notification component
import { notify } from "@/components/notification/Notification";

// config
import config from "../../../config";

// custom hooks
import {
    useFetchData,
    useSubmitData,
    useFormNumberInput,
    useFormStringInput,
    useDeleteData,
} from "@/util/customHooks";

// models
import { Floor, FloorWithBuilding } from "@/models/Floor";
import { Room, RoomWithFloor } from "@/models/Room";


interface Props {
    item: {
        value: RoomWithFloor;
    };
    action: string;
    reFetchData: () => void;
    close: () => void;
}

export default function RoomForm(props: Props) {
    // fetchers
    const selectBoxFloorsDataFetch = useFetchData(
        config.mgiAPI.baseUrl + config.mgiAPI.routes.floors
    ); // fetch floors

    // form submitter
    const roomForm = useSubmitData(
        config.mgiAPI.baseUrl + config.mgiAPI.routes.rooms,
        props.action === "edit" ? "PUT" : "POST"
    );

    // deleter
    const roomDeleter = useDeleteData(
        config.mgiAPI.baseUrl + config.mgiAPI.routes.rooms + props.item?.value.id
    );

    // inputs
    const roomNumber = useFormStringInput(props.item.value?.number);
    const roomFloor = useFormStringInput(props.item.value?.floor?.id);

    // button enables - used to prevent double clicks
    const [enabled, setEnabled] = useState<boolean>(true);

    // updates the room and refreshes the table
    const handleSubmitData = async () => {
        setEnabled(false);

        // set room data
        let item: Room = {
            ...props.item.value,
            floor: props.item.value?.floor?.id,
        };
        item.id = props.item.value?.id;
        item.number = roomNumber.value;
        item.floor = roomFloor.value;

        // submit data
        let res = await roomForm.submit(item);

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        props.reFetchData(); // refresh data
        setEnabled(true); // enable buttons

        // show alert
        notify.success(
            `Room ${props.action == "edit" ? "edited" : "added"} successfully`
        );
    };

    const handleDeleteData = async () => {
        setEnabled(false);

        // delete data
        let res = await roomDeleter.del();

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        props.reFetchData(); // refresh data
        setEnabled(true); // enable buttons

        // show alert
        notify.success(`Room deleted successfully`);

        // close modal
        props.close();
    };

    // when rooms load, load them to the select box
    useEffect(() => {
        // if there's no data, return
        if (!selectBoxFloorsDataFetch.data) {
            return;
        }

        roomFloor.handleLoad(selectBoxFloorsDataFetch.data[0].id);
    }, [selectBoxFloorsDataFetch.data]);

    if (selectBoxFloorsDataFetch.isLoading) {
        return <Form>Loading...</Form>;
    }
    if (selectBoxFloorsDataFetch.isError) {
        return <Form>Error</Form>;
    }

    // filter data so it removes the element already selected
    const filteredSelectBoxData = selectBoxFloorsDataFetch.data.filter(
        (item: any) => item.id !== props.item.value?.floor?.id
    );

    // handle for selecting a floor
    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        roomFloor.handleLoad(e.target.value);
    };

    return (
        <Form>
            {props.action === "edit" && (
                <>
                    <Row>
                        <Col sm={12}>
                            <Form.Group className="mb-6">
                                <Form.Label htmlFor="select">Room ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={props.item.value?.id}
                                    disabled
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <br />
                </>
            )}
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="room's number..."
                            defaultValue={props.item.value?.number}
                            onChange={roomNumber.handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Floor</Form.Label>

                        <Form.Select
                            defaultValue={
                                props.item.value?.floor?.id ?? filteredSelectBoxData[0].id
                            }
                            onChange={handleSelect}
                        >
                            {props.item.value?.floor?.id && (
                                <option defaultChecked={true}>
                                    {props.item.value?.floor.number +
                                        " - " +
                                        props.item.value?.floor.information}
                                </option>
                            )}

                            {filteredSelectBoxData?.map((item: Floor) => (
                                <option key={item.id} value={item.id}>
                                    {/* show 2nd prop from item, 1st prop is the id */}
                                    {item.number + " - " + item.information}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <br />
            <Row>
                <Col sm={12}>
                    <Form.Group className="mb-12">
                        {props.action === "edit" ? (
                            <>
                                <Button
                                    variant="primary"
                                    onClick={handleSubmitData}
                                    disabled={
                                        !roomNumber.value ||
                                        !enabled
                                    }
                                >
                                    Update
                                </Button>

                                <Button variant="danger" onClick={handleDeleteData}>
                                    Delete
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="success"
                                onClick={handleSubmitData}
                                disabled={
                                    !roomNumber.value ||
                                    !enabled
                                }
                            >
                                Add
                            </Button>
                        )}
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}