'use client';

import BuildingSearchForm from './BuildingSearchForm';
import FloorSearchForm from './FloorSearchForm';
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
                    return <RobotSearchForm setParams={props.setParams} />;
                case 'building':
                    return <BuildingSearchForm setParams={props.setParams} />;
                case 'floor':
                    return <FloorSearchForm setParams={props.setParams} />;
                default:
                    return <></>;
            }
        }
    };

    return filterForm();
}