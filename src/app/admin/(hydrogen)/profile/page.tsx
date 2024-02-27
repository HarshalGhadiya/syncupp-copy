import ViewProfileForm from './view-profile';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Profile'),
};

export default function ViewProfile() {
  return (
    <>
      <ViewProfileForm />
    </>
  );
}
