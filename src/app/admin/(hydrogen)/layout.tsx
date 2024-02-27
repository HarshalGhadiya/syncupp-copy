'use client';
import HeliumLayout from '@/layouts/helium-admin/helium-layout';
import { useIsMounted } from '@/hooks/use-is-mounted';
import WithAuth from '@/utils/private-route-admin';



function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return <HeliumLayout>{children}</HeliumLayout>;
}

export default WithAuth(DefaultLayout);
