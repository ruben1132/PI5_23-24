import BuildingForm from "./BuildingForm";
import FloorForm from "./FloorForm";

interface Props {
  item: {
    value: any;
    type: string;
  };
  onUpdate: (item: any) => void;
}

export function RenderFilteredForm(props: Props) {
  const filterForm = () => {
    {
      switch (props.item.type.toLocaleLowerCase()) {
        case "building":
          return (
            <BuildingForm
              item={{ value: props.item.value }}
              onUpdate={props.onUpdate}
            />
          );
        case "floor":
          return (
            <FloorForm
              item={{ value: props.item.value }}
              onUpdate={props.onUpdate}
            />
          );
        default:
          return <p>no form dummy :p create one! :D</p>;
      }
    }
  };

  return filterForm();
}
