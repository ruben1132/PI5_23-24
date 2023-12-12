import BuildingForm from './BuildingForm';
import FloorForm from './FloorForm';
import RobotTypeForm from './RobotTypeForm';
import RoleForm from './RoleForm';
import TaskTypeForm from './TaskTypeForm';
import PassageForm from './PassageForm';
import ElevatorForm from './ElevatorForm';
import RobotForm from './RobotForm';
import RoomForm from './RoomForm';
import TaskForm from './TaskForm';
import SysUserForm from './SysUserForm';
import TaskPlanningForm from './TaskPlanningForm';

interface Props {
    item: {
        value: any;
        type: string;
    };
    action: string;
    reFetchData: () => void;
    close: () => void;
}

export function RenderFilteredForm(props: Props) {
    const filterForm = () => {
        {
            switch (props.item.type.toLocaleLowerCase()) {
                case 'building':
                    return (
                        <BuildingForm
                            item={{ value: props.item.value }}
                            action={props.action}
                            reFetchData={props.reFetchData}
                            close={props.close}
                        />
                    );
                case 'floor':
                    return (
                        <FloorForm
                            item={{ value: props.item.value }}
                            action={props.action}
                            reFetchData={props.reFetchData}
                            close={props.close}
                        />
                    );
                case 'robottype':
                    return (
                        <RobotTypeForm
                            item={{ value: props.item.value }}
                            action={props.action}
                            reFetchData={props.reFetchData}
                            close={props.close}
                        />
                    );
                case 'tasktype':
                    return (
                        <TaskTypeForm
                            item={{ value: props.item.value }}
                            action={props.action}
                            reFetchData={props.reFetchData}
                            close={props.close}
                        />
                    );
                case 'role':
                    return (
                        <RoleForm
                            item={{ value: props.item.value }}
                            action={props.action}
                            reFetchData={props.reFetchData}
                            close={props.close}
                        />
                    );
                case 'passage':
                    return (
                        <PassageForm
                            item={{ value: props.item.value }}
                            action={props.action}
                            reFetchData={props.reFetchData}
                            close={props.close}
                        />
                    );
                case 'elevator':
                    return (
                        <ElevatorForm
                            item={{ value: props.item.value }}
                            action={props.action}
                            reFetchData={props.reFetchData}
                            close={props.close}
                        />
                    );
                case 'robot':
                    return (
                        <RobotForm
                            item={{ value: props.item.value }}
                            action={props.action}
                            reFetchData={props.reFetchData}
                            close={props.close}
                        />
                    );
                case 'room':
                    return (
                        <RoomForm
                            item={{ value: props.item.value }}
                            action={props.action}
                            reFetchData={props.reFetchData}
                            close={props.close}
                        />
                    );
                case 'task':
                    return (
                        <TaskForm
                            item={{ value: props.item.value }}
                            action={props.action}
                            reFetchData={props.reFetchData}
                            close={props.close}
                        />
                    );
                case 'taskplanning':
                    return (
                        <TaskPlanningForm
                            item={{ value: props.item.value }}
                            reFetchData={props.reFetchData}
                            close={props.close}
                        />
                    );
                case 'sysuser':
                    return (
                        <SysUserForm
                            item={{ value: props.item.value }}
                            action={props.action}
                            reFetchData={props.reFetchData}
                            close={props.close}
                        />
                    );
                default:
                    return <p>no form dummy :p create one! :D</p>;
            }
        }
    };

    return filterForm();
}
