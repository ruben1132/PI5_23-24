import PageContent from '@/components/pageContent/PageContent';
import config from '../../../../config';

export default async function Buildings() {
    return (
        <div>
            <p>Buildings</p>

            <PageContent
                type="building"
                routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.buildings}
            />
        </div>
    );
}
