'use client';

// react
import React, { useEffect } from 'react';

// react bootstrap components
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// config
import config from '../../../../config/config';
import { userRole } from '../../../../config/config';

// custom hooks
import { useFetchData, useFormStringInput } from '@/util/customHooks';
import TaskTypeSelectBox from '@/components/selectBoxes/TaskTypeSelectBox';
import CloseButton from 'react-bootstrap/CloseButton';
import StateSelectBox from '@/components/selectBoxes/StateSelectBox';
import UserSelectBox from '@/components/selectBoxes/UserSelectBox';

// auth context
import { useAuth } from '@/context/AuthContext';

interface Props {
    setParams: (params: string) => void;
}

export default function TaskSearchForm(props: Props) {
// auth context
const { user } = useAuth();

    // data fetch
    const taskTypeDataFetch = useFetchData(config.mgiAPI.baseUrl + config.mgiAPI.routes.tasktypes);
    const usersDataFetch = useFetchData(
        user?.role.name !== userRole.UTENTE && config.mptAPI.baseUrl + config.mptAPI.routes.users,
    );

    // inputs
    const taskType = useFormStringInput(null);
    const taskIsApproved = useFormStringInput('');
    const userSelected = useFormStringInput('');

    const buildQueryParams = () => {
        
        let isApprovedString = '';
        if (taskIsApproved.value !== config.states.ALL) isApprovedString = `&isApproved=${taskIsApproved.value}`;

        let taskTypeName = taskTypeDataFetch.data?.find((t) => t.id === taskType.value)?.name;            

        if (user?.role.name === userRole.UTENTE) {
            return `${config.mptAPI.routes.mytasks}?type=${taskTypeName ?? ""}${isApprovedString}`;
        }
        return `?type=${taskTypeName ?? ""}${isApprovedString}&user=${userSelected.value}`;
    };

    useEffect(() => {
        const queryParams = buildQueryParams();
        props.setParams(queryParams);
    }, [taskType.value, taskIsApproved.value, userSelected.value, user?.role.name]);


    return (
        <Form>
            <Row className="justify-content-md-center">
                <Col sm={3}>
                    <Form.Group className="mb-4">
                        <TaskTypeSelectBox
                            data={taskTypeDataFetch.data}
                            isLoading={taskTypeDataFetch.isLoading}
                            isError={taskTypeDataFetch.isError}
                            setValue={taskType.handleLoad}
                            allOption={true}
                        />
                    </Form.Group>
                </Col>
                <Col sm={3}>
                    <StateSelectBox setValue={taskIsApproved.handleLoad} />
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
                                taskType.handleLoad('');
                                taskIsApproved.handleLoad('');
                                userSelected.handleLoad('');
                            }}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}
