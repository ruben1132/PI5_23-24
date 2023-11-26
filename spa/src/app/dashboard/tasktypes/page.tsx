import PageContent from '@/components/pageContent/PageContent';
import config from '../../../../config';

export default async function Tasktypes() {
    return (
        <div>
            <p>Tasktypes</p>

            <PageContent
                type="tasktype"
                routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.tasktypes}
                routeToPush={'/tasktypes/'}
            />
        </div>
    );
}
