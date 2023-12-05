'use client';

import ContentTable from '../table/Table';
import { RenderFilteredSearch } from '../forms/search/RenderFilteredSearch';
import { useEffect, useState } from 'react';

interface Props {
    type: string;
    routeToFetch: string;
    children?: React.ReactNode;
}

const PageContent = (props: Props) => {
    const [queryParms, setQueryParms] = useState<string>('');
    const [route, setRoute] = useState<string>(props.routeToFetch + queryParms);

    // each time the parms change, update the route
    useEffect(() => {
        setRoute(props.routeToFetch + queryParms);
    }, [queryParms]);

    return (
        <div>
            <RenderFilteredSearch type={props.type} setParams={setQueryParms} />
            <br />
            
            <ContentTable type={props.type} routeToFetch={route}  />
        </div>
    );
};

export default PageContent;
