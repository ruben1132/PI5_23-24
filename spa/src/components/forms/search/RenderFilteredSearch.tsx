"use client";

import RobotSearchForm from './RobotSearchForm';

interface Props {
    type: string;
    setParams: (params: string) => void;
}

export function RenderFilteredSearch(props: Props) {

    
    const filterForm = () => {
        {
            switch (props.type.toLocaleLowerCase()) {
                case 'robot':
                    return <RobotSearchForm setParams={props.setParams}  />;
                default:
                    return <></>;
            }
        }
    };

    return filterForm();
}
