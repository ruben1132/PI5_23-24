import PageContent from '@/components/pageContent/PageContent';
import config from '../../../../config';

export default async function Elevators() {
    return (
        <div>
            <p>Elevators</p>

            <PageContent
                type="elevator"
                routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.elevators}
            />
        </div>
    );
}
