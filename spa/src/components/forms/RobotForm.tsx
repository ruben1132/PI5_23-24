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

// model
import { Robot, RobotWithRobotType } from '../../models/Robot';
import { RobotType } from '../../models/RobotType';
import RobotTypeSelectBox from '../selectBoxes/RobotTypeSelectBox';

interface Props {
    item: {
        value: RobotWithRobotType;
    };
    action: string;
    reFetchData: () => void;
    close: () => void;
}

export default function RobotForm(props: Props) {
    const selectBoxRobotTypesDataFetch = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.robottypes); // fetch floors for fromFloor

    // form submitter
    const robotForm = useSubmitData(
        config.mgiAPI.baseUrl + config.mgiAPI.routes.robots,
        props.action === 'edit' ? 'PUT' : 'POST',
    );

    // robot uploader
    const enableDisableRobot = useSubmitData(config.mgiAPI.baseUrl + config.mgiAPI.routes.robots, 'PATCH');

    // deleter
    const robotDeleter = useDeleteData(config.mgiAPI.baseUrl + config.mgiAPI.routes.robots + props.item?.value.id);

    // inputs
    const robotIdentification = useFormStringInput(props.item.value?.identification);
    const robotNickname = useFormStringInput(props.item.value?.nickname);
    const robotType = useFormStringInput(props.item.value?.robotType?.id?.toString());
    const robotSerialNumber = useFormStringInput(props.item.value?.serialNumber);
    const robotDescription = useFormStringInput(props.item.value?.description);
    const robotState = useFormStringInput(props.item.value?.state?.toString());

    // button enables - used to prevent double clicks
    const [enabled, setEnabled] = useState<boolean>(true);

    // updates the robot and refreshes the table
    const handleSubmitData = async () => {
        setEnabled(false);

        // set robot data
        let item: Robot = {
            ...props.item.value,
            robotType: props.item.value?.robotType?.id.toString(),
        };
        item.id = props.item.value?.id;
        item.identification = robotIdentification.value;
        item.nickname = robotNickname.value;
        item.robotType = robotType.value;
        item.serialNumber = robotSerialNumber.value;
        item.description = robotDescription.value;
        item.state = true;

        // submit data
        let res = await robotForm.submit(item);

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        props.reFetchData(); // refresh data
        setEnabled(true); // enable buttons

        // show alert
        notify.success(`Robot ${props.action == 'edit' ? 'edited' : 'added'} successfully`);
    };

    const handleDeleteData = async () => {
        setEnabled(false);

        // delete data
        let res = await robotDeleter.del();

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        props.reFetchData(); // refresh data
        setEnabled(true); // enable buttons

        // show alert
        notify.success(`Robot deleted successfully`);

        // close modal
        props.close();
    };

    const handleDisable = async () => {
        setEnabled(false);

        const state = {
            id: props.item.value.id,
        };

        let res = await enableDisableRobot.submit(state);

        if (res.error) {
            setEnabled(true);
            notify.error(res.error);
            return;
        }

        props.reFetchData(); // refresh data
        setEnabled(true); // enable buttons

        // show alert
        notify.success(`Robot disabled successfully`);

        // close modal
        props.close();
    };

    // when robots load, load them to the select box
    useEffect(() => {
        // if there's no data, return
        if (
            selectBoxRobotTypesDataFetch.data === undefined ||
            selectBoxRobotTypesDataFetch.data === null ||
            selectBoxRobotTypesDataFetch.data.length <= 0
        ) {
            return;
        }

        if (!props.item.value?.id) {
            robotType.handleLoad(selectBoxRobotTypesDataFetch.data[0].id);
        }
    }, [selectBoxRobotTypesDataFetch.data]);

    if (
        selectBoxRobotTypesDataFetch.data === undefined ||
        selectBoxRobotTypesDataFetch.data === null ||
        selectBoxRobotTypesDataFetch.data.length <= 0
    ) {
        return <Form>Try adding robot types first!</Form>;
    }


    return (
        <Form>
            {props.action === 'edit' && (
                <>
                    <Row>
                        <Col sm={12}>
                            <Form.Group className="mb-6">
                                <Form.Label htmlFor="select">Robot ID</Form.Label>
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
                        <Form.Label htmlFor="select">Identification</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Robot's designation..."
                            defaultValue={props.item.value?.identification}
                            onChange={robotIdentification.handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Nickname</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Robot's designation..."
                            defaultValue={props.item.value?.nickname}
                            onChange={robotNickname.handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Serial Number</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Robot's designation..."
                            defaultValue={props.item.value?.serialNumber}
                            onChange={robotSerialNumber.handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Robot Type</Form.Label>
                        <RobotTypeSelectBox
                        selectedValue={props.item.value?.robotType?.id ?? robotType.value}
                        setValue={robotType.handleLoad}
                        data={selectBoxRobotTypesDataFetch.data}
                        isError={selectBoxRobotTypesDataFetch.isError}
                        isLoading={selectBoxRobotTypesDataFetch.isLoading}
                    />

             
                    </Form.Group>
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-6">
                        <Form.Label htmlFor="select">Description</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Robot's designation..."
                            defaultValue={props.item.value?.description}
                            onChange={robotDescription.handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    {props.action === 'edit' && (
                        <Form.Group className="mb-6">
                            <Form.Label htmlFor="select">State</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Robot's State..."
                                defaultValue={props.item.value?.state?.toString()}
                                onChange={robotState.handleChange}
                                disabled
                            />
                        </Form.Group>
                    )}
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={12}>
                    <Form.Group className="mb-12">
                        {props.action === 'edit' ? (
                            <>
                                {/* <Button
                                    variant="primary"
                                    onClick={handleSubmitData}
                                    disabled={
                                        robotIdentification.value === "" ||
                                        robotNickname.value === "" ||
                                        robotType.value === "" ||
                                        robotSerialNumber.value === "" ||
                                        robotDescription.value === "" ||
                                        robotState.value === "" ||
                                        !enabled
                                    }
                                >
                                    Update
                                </Button> */}
                                <Button variant="warning" onClick={handleDisable}>
                                    Disable
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
                                    robotIdentification.value === '' ||
                                    robotNickname.value === '' ||
                                    robotType.value === '' ||
                                    robotSerialNumber.value === '' ||
                                    robotDescription.value === '' ||
                                    robotState.value === '' ||
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
