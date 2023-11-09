import BuildingForm from "./BuildingForm";
import FloorForm from "./FloorForm";

interface Props {
  item: {
    value: any;
    type: string;
  };
  action: string;
  reFetchData: () => void;
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
            />
          );
        case "floor":
          return (
            <FloorForm
              item={{ value: props.item.value }}
              action={props.action}
              reFetchData={props.reFetchData}
            />
          );
        default:
          return <p>no form dummy :p create one! :D</p>;
      }
    }
  };

  return filterForm();
}
