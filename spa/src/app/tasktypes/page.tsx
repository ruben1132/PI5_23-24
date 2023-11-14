import ContentTable from '@/components/table/Table';
import config from '../../../config';

export default async function Tasktypes() {
    return (
        <div>
            <p>Tasktypes</p>

            <ContentTable
                type="tasktype"
                routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.tasktypes}
                routeToPush={'/tasktypes/'}
            />
        </div>
    );
}
