'use client';

// react
import React, { useEffect } from 'react';

// react bootstrap components
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// config
import config from '../../../../config';
import { userRole } from '../../../../config';

// auth context
import { useAuth } from '@/context/AuthContext';

// custom hooks
import { useFetchData, useFormStringInput } from '@/util/customHooks';
import TaskTypeSelectBox from '@/components/selectBoxes/TaskTypeSelectBox';
import CloseButton from 'react-bootstrap/CloseButton';
import StateSelectBox from '@/components/selectBoxes/StateSelectBox';
import UserSelectBox from '@/components/selectBoxes/UserSelectBox';

interface Props {
    setParams: (params: string) => void;
}

export default function TaskSearchForm(props: Props) {
    const { user } = useAuth();

    // data fetch
    const taskTypeDataFetch = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.tasktypes);
    const usersDataFetch = useFetchData(
        user?.role.name !== userRole.UTENTE && config.mptAPI.baseUrl + config.mptAPI.routes.users,
    );

    // inputs
    const taskType = useFormStringInput(null);
    const taskIsApproved = useFormStringInput(config.states[0]);
    const userSelected = useFormStringInput('');

    const buildQueryParams = () => {
        let isApprovedString = '';
        if (taskIsApproved.value !== config.states[3]) isApprovedString = `&isApproved=${taskIsApproved.value}`;

        if (user?.role.name === userRole.UTENTE) {
            return `${config.mptAPI.routes.mytasks}?type=${taskType.value}${isApprovedString}`;
        }
        return `?type=${taskType.value}${isApprovedString}&user=${userSelected.value}`;
    };

    useEffect(() => {
        const queryParams = buildQueryParams();
        props.setParams(queryParams);
    }, [taskType.value, taskIsApproved.value]);

    useEffect(() => {
        if (taskTypeDataFetch.data && taskTypeDataFetch.data.length > 0) {
            taskType.handleLoad(taskTypeDataFetch.data[0].id);
        }
    }, [taskTypeDataFetch.data]);

    return (
        <Form>
            <Row className="justify-content-md-center">
                <Col sm={3}>
                    <Form.Group className="mb-4">
                        <TaskTypeSelectBox
                            selectedValue={taskType.value}
                            data={taskTypeDataFetch.data}
                            isLoading={taskTypeDataFetch.isLoading}
                            isError={taskTypeDataFetch.isError}
                            setValue={taskType.handleLoad}
                        />
                    </Form.Group>
                </Col>
                <Col sm={3}>
                    <StateSelectBox setValue={taskIsApproved.handleLoad} selectedValue={taskIsApproved.value} />
                </Col>
                {user?.role.name !== userRole.UTENTE && (
                    <Col sm={3}>
                        <UserSelectBox
                            setValue={userSelected.handleLoad}
                            data={usersDataFetch.data}
                            isLoading={usersDataFetch.isLoading}
                            isError={usersDataFetch.isError}
                        />
                    </Col>
                )}

                <Col sm={2}>
                    <Form.Group className="mb-2">
                        <CloseButton
                            onClick={() => {
                                taskType.handleLoad(taskTypeDataFetch.data[0].id);
                                taskIsApproved.handleLoad(config.states[0]);
                                userSelected.handleLoad('');
                            }}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}
