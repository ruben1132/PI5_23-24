import config from '../../../../config';
import PageContent from '@/components/pageContent/PageContent';

export default async function Robots() {
    return (
        <div>
            <p>Robots</p>

            <PageContent
                type="robot"
                routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.robots}
                routeToPush={'/robots/'}
            />
        </div>
    );
}
