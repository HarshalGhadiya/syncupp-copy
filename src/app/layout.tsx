import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';
// import { getServerSession } from 'next-auth/next';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../api/auth/[...nextauth]/auth-options';
// import AuthProvider from '../api/auth/[...nextauth]/auth-provider';
import GlobalDrawer from '@/app/shared/drawer-views/container';
import GlobalModal from '@/app/shared/modal-views/container';
import { ThemeProvider } from '@/app/shared/theme-provider';
import { siteConfig } from '@/config/site.config';
import { inter, lexendDeca } from '@/app/fonts';
import cn from '@/utils/class-names';

const NextProgress = dynamic(() => import('@/components/next-progress'), {
  ssr: false,
});
// styles
import '@/app/globals.css';
import { Providers } from '@/redux/provider';
import { Persistor } from '@/redux/persistor';
import { GoogleOAuthProviders } from '@/redux/google-clientid-provider';
// import { authOptions } from '@/api/auth/[...nextauth]/auth-options';

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(authOptions);
  return (
    <html
      lang="en"
      dir="ltr"
      // required this one for next-themes, remove it if you are not using next-theme
      suppressHydrationWarning
    >
      <body
        // to prevent any warning that is caused by third party extensions like Grammarly
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, 'font-inter')}
      >
        {/* <AuthProvider session={session}> */}
        <GoogleOAuthProviders>
          <Providers>
            <Persistor>
              <ThemeProvider>
                <NextProgress />
                  {children}
                <Toaster position='top-right' />
                <GlobalDrawer />
                <GlobalModal />
              </ThemeProvider>
            </Persistor>
          </Providers>  
        </GoogleOAuthProviders>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
