import PageContent from '@/components/pageContent/PageContent';
import config from '../../../../config';

export default async function Roles() {
    return (
        <div>
            <p>Roles</p>

            <PageContent
                type="role"
                routeToFetch={config.mptAPI.baseUrl + config.mptAPI.routes.roles}
            />
        </div>
    );
}
