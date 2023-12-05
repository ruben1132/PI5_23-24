import PageContent from '@/components/pageContent/PageContent';
import config from '../../../../config';
import UserForm from '@/components/forms/LoginForm';

export default async function Passages() {
    return (
        <div>
            <p>Profile</p>

            <UserForm
                type="passage"
                routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.passages}
                routeToPush={'/passages/'}
            />
        </div>
    );
}
