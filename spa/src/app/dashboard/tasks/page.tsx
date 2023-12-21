import config from '../../../../config/config';
import PageContentTask from '@/components/pageContent/PageContentTask';

export default async function Tasks() {
    return (
        <div>
            <p>Tasks</p>

            <PageContentTask
                type="task"
                routeToFetch={config.mptAPI.baseUrl + config.mptAPI.routes.tasks}
            />
        </div>
    );
}
