import PageContent from '@/components/pageContent/PageContent';
import config from '../../../../config';

export default async function Robottypes() {
    return (
        <div>
            <p>Robottypes</p>

            <PageContent
                type="robottype"
                routeToFetch={config.mgiAPI.baseUrl + config.mgiAPI.routes.robottypes}
            />
        </div>
    );
}
