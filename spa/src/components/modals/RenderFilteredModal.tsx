import BuildingModal from "./BuildingModal";

interface Props {
  action: string;
  type: string;
  fade: boolean;
  show: boolean;
  item: any;
  close: () => void;
  onUpdate: () => void;
}

export function RenderFilteredModal(props: Props) {
  const filterModal = () => {
    {
      switch (props.type) {
        case "building":
          return (
            <BuildingModal
              action={props.action}
              item={props.item}
              fade={false}
              show={props.show}
              close={props.close}
              onUpdate={props.onUpdate}
            />
          );
        default:
          return <p>no modal dummy :p create one! :D</p>;
      }
    }
  };

  return filterModal();
}
