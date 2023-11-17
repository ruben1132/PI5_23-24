import ContentTable from '@/components/table/Table';
import config from '../../../../config';

export default async function Robots() {
    return (
        <div>
            <p>Robots</p>

            <ContentTable
                type="robot"
                routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.robots}
                routeToPush={'/robots/'}
            />
        </div>
    );
}
