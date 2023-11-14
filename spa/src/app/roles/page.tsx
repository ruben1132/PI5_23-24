import ContentTable from '@/components/table/Table';
import config from '../../../config';

export default async function Roles() {
    return (
        <div>
            <p>Roles</p>

            <ContentTable
                type="role"
                routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.roles}
                routeToPush={'/roles/'}
            />
        </div>
    );
}
