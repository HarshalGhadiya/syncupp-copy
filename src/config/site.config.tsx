import { Metadata } from 'next';
import { LAYOUT_OPTIONS } from '@/config/enums';
import logoIconImg from '@public/assets/images/SyncUpp.png';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import syncuppLogo from '@public/assets/svgs/syncupp-logo.svg';


enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'SyncUpp',
  description: `SyncUpp`,
  logo: syncuppLogo,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HELIUM,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} | SyncUpp` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} | SyncUpp` : title,
      description,
      locale: 'en_US',
      type: 'website',
    },
  };
};
