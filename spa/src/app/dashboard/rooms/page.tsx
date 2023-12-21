import PageContent from '@/components/pageContent/PageContent';
import config from '../../../../config/config';

export default async function Rooms() {
    return (
        <div>
            <p>Rooms</p>

            <PageContent
                type="room"
                routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.rooms}
            />
        </div>
    );
}
