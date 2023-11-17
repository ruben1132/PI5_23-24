import ContentTable from '@/components/table/Table';
import config from '../../../../config';

export default async function Floors() {
    return (
        <div>
            <p>Floors</p>

            <ContentTable
                type="floor"
                routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.floors}
                routeToPush={'/floors/'}
            />
        </div>
    );
}
