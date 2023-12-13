import PageContent from '@/components/pageContent/PageContent';
import config from '../../../../config';

export default async function Users() {
    return (
        <div>
            <p>Users</p>

            <PageContent
                type="user"
                routeToFetch={config.mptAPI.baseUrl + config.mptAPI.routes.users}
            />
        </div>
    );
}
