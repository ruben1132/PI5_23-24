'use client';

// react
import React, { ChangeEvent, useEffect, useState } from 'react';

// react bootstrap components
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';

// notification component
import { notify } from '@/components/notification/Notification';

// config
import config from '../../../config';

// custom hooks
import { useFetchData, useSubmitData, useFormNumberInput, useFormStringInput, useDeleteData } from '@/util/customHooks';

// models
import { Floor, FloorWithBuilding } from '@/models/Floor';
import { Building } from '@/models/Building';

interface Props {
    item: {
        value: FloorWithBuilding;
    };
    action: string;
    reFetchData: () => void;
    close: () => void;
}

export default function FloorForm(props: Props) {
    // fetchers
    const fetchFloorMap = useFetchData(
        config.mgiAPI.baseUrl + config.mgiAPI.routes.floormapsWithFloor + props.item.value.id,
    ); // fetch floor map

    const selectBoxBuildingsDataFetch = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.buildings); // fetch buildings

    // form submitter
    const floorForm = useSubmitData(
        config.mgiAPI.baseUrl + config.mgiAPI.routes.floors,
        props.action === 'edit' ? 'PUT' : 'POST',
    );

    // floor map uploader
    const uploadFloorMap = useSubmitData(config.mgiAPI.baseUrl + config.mgiAPI.routes.floormaps, 'PATCH');

    // deleter
    const floorDeleter = useDeleteData(config.mgiAPI.baseUrl + config.mgiAPI.routes.floors + props.item?.value.id);

    // inputs
    const floorInformation = useFormStringInput(props.item.value?.information);
    const floorNumber = useFormNumberInput(props.item.value?.number);
    const floorBuilding = useFormStringInput(props.item.value?.building?.id);

    // button enables - used to prevent double clicks
    const [enabled, setEnabled] = useState<boolean>(true);

    // handle upload to floormap to server
    const handleUpload = async (file: File | undefined) => {
        if (!file) {
            notify.warning(`There is no file to upload`);
            return;
        }

        let formData = new FormData();
        formData.append('jsonFile', file);
        let res = await uploadFloorMap.submit(formData);

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        props.reFetchData(); // refresh data
        setEnabled(true); // enable buttons

        // show alert
        notify.success(`Floor map uploaded successfully`);

        // fetch floor map again
        fetchFloorMap.revalidate();
    };

    // updates the floor and refreshes the table
    const handleSubmitData = async () => {
        setEnabled(false);

        // set floor data
        let item: Floor = {
            ...props.item.value,
            building: props.item.value?.building?.id,
        };
        item.id = props.item.value?.id;
        item.information = floorInformation.value;
        item.number = floorNumber.value;
        item.building = floorBuilding.value;
        if ('code' in item) {
            delete item.code; // delete code from item
        }

        // submit data
        let res = await floorForm.submit(item);

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        props.reFetchData(); // refresh data
        setEnabled(true); // enable buttons

        // show alert
        notify.success(`Floor ${props.action == 'edit' ? 'edited' : 'added'} successfully`);
    };

    const handleDeleteData = async () => {
        setEnabled(false);

        // delete data
        let res = await floorDeleter.del();

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        props.reFetchData(); // refresh data
        setEnabled(true); // enable buttons

        // show alert
        notify.success(`Floor deleted successfully`);

        // close modal
        props.close();
    };

    // when floors load, load them to the select box
    useEffect(() => {
        // if there's no data, return
        if (!selectBoxBuildingsDataFetch.data || selectBoxBuildingsDataFetch.data.length <= 0) {
            return;
        }

        if(!props.item.value?.building?.id){
            floorBuilding.handleLoad(selectBoxBuildingsDataFetch.data[0].id);
        }
    }, [selectBoxBuildingsDataFetch.data]);

    if (selectBoxBuildingsDataFetch.isLoading) {
        return <Form>Loading...</Form>;
    }
    if (selectBoxBuildingsDataFetch.isError) {
        return <Form>Error</Form>;
    }
    if (
        selectBoxBuildingsDataFetch.data === undefined ||
        selectBoxBuildingsDataFetch.data === null ||
        selectBoxBuildingsDataFetch.data.length <= 0
    ) {
        return <Form>Try adding buildings first!</Form>;
    }

    // filter data so it removes the element already selected
    const filteredSelectBoxData = selectBoxBuildingsDataFetch.data.filter(
        (item: any) => item.id !== props.item.value?.building?.id,
    );

    // handle for selecting a building
    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        floorBuilding.handleLoad(e.target.value);
    };

    return (
        <Form>
            {props.action === 'edit' && (
                <>
                    <Row>
                        <Col sm={12}>
                            <Form.Group className="mb-6">
                                <Form.Label htmlFor="select">Floor ID</Form.Label>
                                <Form.Control type="text" defaultValue={props.item.value?.id} disabled />
                            </Form.Group>
                        </Col>
                    </Row>
                    <br />
                </>
            )}
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Information</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="floor's information..."
                            defaultValue={props.item.value?.information}
                            onChange={floorInformation.handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Number</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="floor's number..."
                            defaultValue={props.item.value?.number}
                            onChange={floorNumber.handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Building</Form.Label>

                        <Form.Select
                            // defaultValue={props.item.value?.building?.id ?? filteredSelectBoxData[0].id}
                            onChange={handleSelect}
                        >
                            {props.item.value?.building?.id && (
                                <option defaultChecked={true}>
                                    {props.item.value?.building.code + ' - ' + props.item.value?.building.name}
                                </option>
                            )}

                            {filteredSelectBoxData?.map((item: Building) => (
                                <option key={item.id} value={item.id}>
                                    {/* show 2nd prop from item, 1st prop is the id */}
                                    {item.code + ' - ' + item.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                {props.item.value.id && (
                    <Col sm={6}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Floor map</Form.Label>
                            <Form.Control
                                key={props.item.value.id}
                                type="file"
                                onChange={(e) => {
                                    handleUpload((e.target as HTMLInputElement).files?.[0]);
                                    e.target.value = '';
                                }}
                            />
                        </Form.Group>
                    </Col>
                )}
            </Row>
            {fetchFloorMap.data && (
                <Col sm={12}>
                    <Form.Group controlId="preview" className="mb-3">
                        <Form.Label>Floor map</Form.Label>
                        <Form.Control as={'textarea'} value={'dsadsada'} disabled={true} style={{ height: '100px' }} />
                    </Form.Group>
                </Col>
            )}

            <br />
            <Row>
                <Col sm={12}>
                    <Form.Group className="mb-12">
                        {props.action === 'edit' ? (
                            <>
                                <Button
                                    variant="primary"
                                    onClick={handleSubmitData}
                                    disabled={
                                        floorInformation.value === '' ||
                                        floorInformation.value === undefined ||
                                        !floorNumber.value ||
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
                                    floorInformation.value === '' ||
                                    floorInformation.value === undefined ||
                                    !floorNumber.value ||
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
