import { metaObject } from '@/config/site.config';
import SignUpPage from './main-page'

export const metadata = {
  ...metaObject('Sign Up'),
};

export default function Page() {

  return (
    <>
      <SignUpPage />
    </>
  );
}