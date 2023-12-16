'use client';

import Table from 'react-bootstrap/Table';
import { Task, TaskWithUser } from '@/models/Task';
import { useAuth } from '@/context/AuthContext';
import { userRole } from '../../../config';

interface Props {
    type: string;
    routeToFetch: string;
    showAddButton?: boolean;
    handleClickRow: (item: any) => void;
    data: Task[] | TaskWithUser[];
}

function TaskTable(props: Props) {
    const { user } = useAuth();

    // filter out the id column
    const filteredColumns = Object.keys(props.data[0]).filter(
        (column: string) => column !== 'id' && column !== 'password',
    );

    return (
        <Table striped>
            <thead>
                <tr>
                    <th>Task Type</th>
                    <th>State Approval</th>
                    <th>Completed</th>
                    {user?.role.name !== userRole.UTENTE && <th>User</th>}
                </tr>
            </thead>
            <tbody>
                {props.data.map((item: Task | TaskWithUser, index: number) => (
                    <tr key={'s-' + index} onClick={() => props.handleClickRow(item)} style={{ cursor: 'pointer' }}>
                        <td>{item.taskType}</td>

                        <td>{item.isApproved}</td>

                        {item.isCompleted === true ? <td>{item.isCompleted}</td> : <td>Not Completed</td>}

                        {user?.role.name !== userRole.UTENTE && <td>{(item as TaskWithUser).user?.email}</td>}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default TaskTable;
