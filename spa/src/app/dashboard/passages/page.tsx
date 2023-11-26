import PageContent from '@/components/pageContent/PageContent';
import config from '../../../../config';

export default async function Passages() {
    return (
        <div>
            <p>Passages</p>

            <PageContent
                type="passage"
                routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.passages}
                routeToPush={'/passages/'}
            />
        </div>
    );
}
