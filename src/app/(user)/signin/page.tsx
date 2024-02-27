import { metaObject } from '@/config/site.config';
import SignIn from './main-page'

export const metadata = {
  ...metaObject('Sign In'),
};

export default function Page() {
  return (
    <SignIn />
  );
}


