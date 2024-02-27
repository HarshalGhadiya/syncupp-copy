'use client';

import Link from 'next/link';
import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { Title } from '@/components/ui/text';
import { Collapse } from '@/components/ui/collapse';
import cn from '@/utils/class-names';
import { PiCaretDownBold } from 'react-icons/pi';
import SimpleBar from '@/components/ui/simplebar';
import { MenuItems } from '@/layouts/helium/helium-menu-items';
import Image from 'next/image';
import { siteConfig } from '@/config/site.config';
import StatusBadge from '@/components/get-status-badge';

export default function HeliumSidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  return (
    <aside
      className={cn(
        'fixed bottom-0 start-0 z-50 h-full w-[284px] dark:bg-gray-100/50 xl:p-5 2xl:w-[308px]',
        className
      )}
    >
      <div className="h-full bg-gradient-to-t from-[#390257] to-[#D1A5EB] p-1.5 pl-0  pr-1.5 dark:bg-gray-100/ xl:rounded-2xl">
        <div className="sticky top-0 z-40 flex justify-center px-6 pb-5 pt-5 2xl:px-8 2xl:pt-6">
          <Link href={'/'} aria-label="Site Logo">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.title}
              // className="dark:invert"
              width={40}
              height={35}
              priority
            />
          </Link>
        </div>

        <SimpleBar className="h-[calc(100%-80px)]">
          <div className="mt-4 pb-3 3xl:mt-6">
            <MenuItems />
          </div>
        </SimpleBar>
      </div>
    </aside>
  );
}
