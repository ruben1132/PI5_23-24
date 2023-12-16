'use client';

import ContentTable from '../table/Table';
import { useEffect, useState } from 'react';

import TaskSearchForm from '../forms/search/TaskSearchForm';

// auth context
import { useAuth } from '@/context/AuthContext';
import { userRole } from '../../../config';

interface Props {
    type: string;
    routeToFetch: string;
    children?: React.ReactNode;
}

const PageContentTask = (props: Props) => {
    const [queryParms, setQueryParms] = useState<string>('');

    const [route, setRoute] = useState<string>(props.routeToFetch + queryParms);

    const { user } = useAuth();

    // each time the parms change, update the route
    useEffect(() => {
        setRoute(props.routeToFetch + queryParms);
    }, [queryParms]);

    return (
        <div>
            <TaskSearchForm setParams={setQueryParms} />
            <br />

            <ContentTable type={props.type} routeToFetch={route} showAddButton={user?.role.name !== userRole.UTENTE}/>
        </div>
    );
};

export default PageContentTask;
