import ContentTable from '@/components/table/Table';
import config from '../../../../config';

export default async function RequestRobot() {
    return (
        <div>
            <p>RequestRobot</p>

            <ContentTable
                type="requestRobot"
                routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.requestRobot}
                routeToPush={'/requestRobot/'}
            />
        </div>
    );
}