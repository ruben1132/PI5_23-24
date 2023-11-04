import BuildingForm from "./BuildingForm";

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
              item={{ value: props.item.value, type: props.item.type }}
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
