import ContentTable from '@/components/table/Table';
import config from '../../../../config';

export default async function Buildings() {
    return (
        <div>
            <p>Buildings</p>

            <ContentTable
                type="building"
                routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.buildings}
                routeToPush={'/buildings/'}
            />
        </div>
    );
}
