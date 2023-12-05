import PageContent from '@/components/pageContent/PageContent';
import config from '../../../../config';
import ProfileForm from '@/components/forms/ProfileForm';

export default async function Passages() {
    return (
        <div>
            <p>Profile</p>

            <ProfileForm />
        </div>
    );
}
