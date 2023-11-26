import PageContent from '@/components/pageContent/PageContent';
import config from '../../../../config';

export default async function Roles() {
    return (
        <div>
            <p>Roles</p>

            <PageContent
                type="role"
                routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.roles}
                routeToPush={'/roles/'}
            />
        </div>
    );
}
