'use client';

import Link from 'next/link';
import Image from 'next/image';
import starImg from '@public/auth/star.svg';
import { Title, Text } from '@/components/ui/text';
import { usePathname } from 'next/navigation';
import { routes } from '@/config/routes';
import cn from '@/utils/class-names';
import {
  PiArrowLeftBold,
  PiArrowLineRight,
  PiDribbbleLogo,
  PiFacebookLogo,
  PiGoogleChromeLogo,
  PiInstagramLogo,
  PiLinkedinLogo,
  PiTwitterLogo,
  PiUserCirclePlus,
} from 'react-icons/pi';
import { siteConfig } from '@/config/site.config';
import { Button } from 'rizzui';
import OrSeparation from './or-separation';

export default function AuthWrapperTwo({
  children,
  title,
  isSocialLoginActive = false,
  isSignIn = false,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  isSocialLoginActive?: boolean;
  isSignIn?: boolean;
}) {
  return (
    <div className="min-h-screen items-center justify-center xl:flex xl:bg-gray-50 ">
      <div className="mx-auto w-full py-2 xl:py-14 2xl:w-[1720px]">
        <div className="rounded-xl bg-white dark:bg-transparent xl:flex dark:xl:bg-gray-100/50">
          <AuthNavBar />
          <IntroBannerBlock />
          <div className="flex w-full items-center px-4 xl:px-0">
            <div className="mx-auto w-full max-w-sm shrink-0 py-16 md:max-w-md xl:px-8 xl:py-10 2xl:max-w-xl 2xl:py-14 3xl:py-20">
              <Title
                as="h2"
                className="mb-6 text-center text-[26px] font-bold leading-snug md:!leading-normal xl:mb-8 xl:text-start xl:text-3xl xl:text-[28px] 2xl:-mt-1 2xl:text-4xl"
              >
                {title}
              </Title>
              {isSocialLoginActive && (
                <>
                  <SocialAuth isSignIn={isSignIn} />
                  <OrSeparation
                    className="mb-8 dark:before:bg-gray-200 xl:mb-7 dark:[&>span]:bg-[#191919]"
                    title={`OR ${isSignIn ? 'LOGIN' : 'SIGN UP'} WITH`}
                  />
                </>
              )}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthNavLink({
  href,
  children,
}: React.PropsWithChildren<{
  href: string;
}>) {
  const pathname = usePathname();
  function isActive(href: string) {
    if (pathname === href) {
      return true;
    }
    return false;
  }

  return (
    <Link
      href={href}
      className={cn(
        "relative flex items-center gap-x-1.5 text-[15px] font-medium text-gray-700 transition-colors duration-200 before:absolute before:bottom-0 before:start-0 before:h-0.5 before:bg-primary-light before:content-[''] hover:text-gray-900 xl:gap-x-2.5 xl:px-6 xl:py-0.5 xl:text-base xl:before:top-0 xl:before:h-full 2xl:px-9 [&>svg]:w-[22px] [&>svg]:shrink-0 xl:[&>svg]:w-6",
        isActive(href) ? 'before:w-full xl:before:w-1' : ' '
      )}
    >
      {children}
    </Link>
  );
}

function AuthNavBar() {
  return (
    <div className="flex shrink-0 justify-between rounded-bl-xl rounded-tl-xl bg-white px-4 py-4 dark:bg-transparent xl:sticky xl:top-0 xl:w-36 xl:flex-col xl:items-center xl:justify-start xl:px-0 xl:py-14 2xl:w-[184px]">
      <Link href="/" className="mb-1 inline-block max-w-[64px]">
        <Image src={siteConfig.logo} alt="Isomorphic" className="dark:invert" width={40} height={35} />
      </Link>
    </div>
  );
}

function SocialAuth({
  isSignIn = false,
}: {
  isSignIn?: boolean;
}) {
  return (
    <></>
  );
}

function IntroBannerBlock() {
  return (
    <div className="relative hidden w-[calc(50%-50px)] shrink-0 rounded-lg xl:-my-9 xl:block xl:w-[calc(50%-20px)] 2xl:-my-12 3xl:-my-14">
      <div className="absolute mx-auto h-full w-full overflow-hidden rounded-lg before:absolute before:start-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-[#043ABA]/80 before:content-['']">
        <Image
          fill
          priority
          src={
            'https://isomorphic-furyroad.s3.amazonaws.com/public/auth/sign-in-bg2.webp'
          }
          alt="Sign Up Thumbnail"
          sizes="(max-width: 768px) 100vw"
          className="bg-primary object-cover"
        />
      </div>
      <div className="relative z-20 flex h-full flex-col justify-between px-10 py-24 xl:px-16 xl:py-28 2xl:px-24">
        <div className="text-white">
          <div className="inline-flex max-w-[120px]">
            <Image src={starImg} alt="Star" />
          </div>
          <Title
            as="h2"
            className="mb-5 pt-3.5 text-[26px] font-semibold leading-snug text-white md:text-3xl md:!leading-normal xl:mb-7 xl:text-4xl xl:text-[28px] xl:leading-snug 2xl:text-5xl 2xl:leading-snug"
          >
            Admin Panel Login
          </Title>
          <Text className="mb-5 text-base leading-loose xl:mb-7 2xl:pe-20">
          This page is designed to ensure secure access, allowing authorized personnel to manage and control various aspects of the platform.
          </Text>
        </div>
        <SocialLinks />
      </div>
    </div>
  );
}

const socialLinks = [
  {
    title: 'Facebook',
    link: 'https://www.facebook.com/redqinc',
    icon: <PiFacebookLogo className="h-auto w-4" />,
  },
  {
    title: 'Google',
    link: 'https://www.google.com/',
    icon: <PiGoogleChromeLogo className="h-auto w-4" />,
  },
];
function SocialLinks() {
  return (
    <div className="-mx-2 flex items-center pt-24 text-white xl:-mx-2.5 2xl:pb-5 2xl:pt-40 [&>a>svg]:w-5 xl:[&>a>svg]:w-6">
      {socialLinks?.map((item) => (
        <a
          key={item.title}
          href={item.link}
          title={item.title}
          target="_blank"
          className="mx-2 transition-opacity hover:opacity-80 xl:mx-2.5"
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}

const members = [
  'https://randomuser.me/api/portraits/women/40.jpg',
  'https://randomuser.me/api/portraits/women/41.jpg',
  'https://randomuser.me/api/portraits/women/42.jpg',
  'https://randomuser.me/api/portraits/women/43.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
];
