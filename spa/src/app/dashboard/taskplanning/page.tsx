import PageContent from '@/components/pageContent/PageContent';
import config from '../../../../config';

export default async function Tasks() {
    return (
        <div>
            <p>Task Planning</p>

            <PageContent
                type="taskplanning"
                routeToFetch={config.mptAPI.baseUrl + config.mptAPI.routes.plannings}
            />
        </div>
    );
}
