'use client';

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
                case 'passage':
                    return <td key={props.index}>{props.item.information}</td>;
                case 'robot':
                    return <td key={props.index}>{props.item.type}</td>;
                case 'elevator':
                    return (
                        <td key={props.index}>
                            [
                            {props.item.map((type: any, index: number) => (
                                <span key={index}>
                                    {type.information}
                                    {index !== props.item.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                            ]{' '}
                        </td>
                    );
                case 'floor':
                    return <td key={props.index}>{props.item.code + ' - ' + props.item.name}</td>;
                case 'robottype':
                    return (
                        <td key={props.index}>
                            [
                            {props.item.map((type: any, index: number) => (
                                <span key={index}>
                                    {type.name}
                                    {index !== props.item.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                            ]
                        </td>
                    );
                case 'room':
                    return <td key={props.index}>{props.item.code}</td>;

                default:
                    return <td key={props.index}>no row handler for this item dummy :p create one! :D</td>;
            }
        }

        if (typeof props.item === 'boolean') {
            return <td key={props.index}>{props.item ? 'Enabled' : 'Disabled'}</td>;
        }

        return <td key={props.index}>{props.item}</td>;
    };

    return filterForm();
}
