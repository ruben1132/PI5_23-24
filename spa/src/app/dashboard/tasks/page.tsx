import PageContent from '@/components/pageContent/PageContent';
import config from '../../../../config';

export default async function Tasks() {
    return (
        <div>
            <p>Tasks</p>

            <PageContent
                type="task"
                routeToFetch={""}
                routeToPush={'/tasks/'}
            />
        </div>
    );
}
