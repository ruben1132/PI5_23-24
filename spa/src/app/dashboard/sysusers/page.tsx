import PageContent from '@/components/pageContent/PageContent';
import config from '../../../../config';

export default async function Users() {
    return (
        <div>
            <p>System Users</p>

            <PageContent
                type="sysuser"
                routeToFetch={config.mptAPI.baseUrl + config.mptAPI.routes.sysusers}
            />
        </div>
    );
}
