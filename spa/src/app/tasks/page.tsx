import ContentTable from '@/components/table/Table';
import config from '../../../config';

export default async function Tasks() {
    return (
        <div>
            <p>Tasks</p>

            <ContentTable
                type="task"
                routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.tasks}
                routeToPush={'/tasks/'}
            />
        </div>
    );
}
