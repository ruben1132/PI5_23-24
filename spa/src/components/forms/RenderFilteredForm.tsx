import BuildingForm from "./BuildingForm";
import FloorForm from "./FloorForm";
import RobotTypeForm from "./RobotTypeForm";
import TaskTypeForm from "./TaskTypeForm";

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
        case "building":
          return (
            <BuildingForm
              item={{ value: props.item.value }}
              action={props.action}
              reFetchData={props.reFetchData}
              close={props.close}
            />
          );
        case "floor":
          return (
            <FloorForm
              item={{ value: props.item.value }}
              action={props.action}
              reFetchData={props.reFetchData}
              close={props.close}
            />
          );
        case "robottype":
          return (
            <RobotTypeForm
              item={{ value: props.item.value }}
              action={props.action}
              reFetchData={props.reFetchData}
              close={props.close}
            />
          );
        case "tasktype":
          return (
            <TaskTypeForm
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
