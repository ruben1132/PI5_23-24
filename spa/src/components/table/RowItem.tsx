"use client";

interface Props {
  type: string;
  item: any;
  index: number;
}

export default function RowItem(props: Props) {
  const filterForm = () => {
    // This checks if props.item is an obj
    if (props.item instanceof Object) {
      switch (props.type.toLocaleLowerCase()) {
        case "floor":
          return (
            <td key={props.index}>
              {props.item.code + " - " + props.item.name}
            </td>
          );
        case "robottype":
          return (
            <td key={props.index}>
              [
              {props.item.map((type: any, index: string) => (
                <span key={index}>{type}, </span>
              ))}
              ]
            </td>
          );

        default:
          return (
            <td key={props.index}>
              no row handler for this item dummy :p create one! :D
            </td>
          );
      }
    }

    if (typeof props.item === "boolean") {
      return <td key={props.index}>{props.item ? "Enabled" : "Disabled"}</td>;
    }

    return <td key={props.index}>{props.item}</td>;
  };

  return filterForm();
}
