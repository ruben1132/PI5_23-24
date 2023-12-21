import PageContent from '@/components/pageContent/PageContent';
import config from '../../../../config/config';

export default async function Floors() {
    return (
        <div>
            <p>Floors</p>

            <PageContent
                type="floor"
                routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.floors}
            />
        </div>
    );
}
