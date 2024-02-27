import HomePage from '@/app/(cms)/home/home-page';

import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Home'),
};

export default function BlankPage() {
  return (
    <>
      <HomePage />
    </>
  );
}
