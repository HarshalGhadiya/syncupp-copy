"use client";
import cn from '@/utils/class-names';
import PageHeader from '@/app/shared/page-header';
import MetricCard from '@/components/cards/metric-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Title, Text } from '@/components/ui/text';
import { register } from 'react-scroll/modules/mixins/scroller';
import { useScrollableSlider } from '@/hooks/use-scrollable-slider';


const pageHeader = {
    title: 'Refferal',
};

export default function ReferalPage({ className }: { className?: string }) {
    return (
        <>
            <PageHeader title={pageHeader.title}>
            </PageHeader>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 ">
                <div className="flex-col col-span-2 w-full ">
                    <div className="w-full  block md:flex ">
                        <MetricCard
                            className={cn('w-full max-w-full justify-between', className)} title={''} metric={undefined}                        >
                            <Title>
                                Share your referral link
                            </Title>

                            <Text className="mt-3 flex items-center leading-none text-gray-500">
                                You can also share your referral link by copying and sending it
                            </Text>
                            <>

                                <div className='flex-col w-full'>
                                    <div className="w-full block md:flex md:items-center ">
                                        <label className=" block w-full md:w-[69%] my-4">
                                            <Input
                                                type="text"
                                                // onKeyDown={handleKeyDown}

                                                placeholder="http://104.248.10.11:4014/signup?referral=l6qYgcmT"
                                                // color="text" //removed becuse of the build
                                                className="[&>label>span]:font-medium md:me-4 mb-4 md:mb-0"
                                            // {...register('title')}
                                            // error={errors?.title?.message}
                                            />

                                        </label>
                                        <Button
                                            variant="outline"
                                            className="@xl:w-auto dark:hover:border-gray-400 md:me-4 mb-4 md:mb-0"
                                        // onClick={() => closeModal()}
                                        >
                                            Copy Link
                                        </Button>
                                        <Button

                                            className="@xl:w-auto dark:hover:border-gray-400"
                                        // onClick={() => closeModal()}
                                        >
                                            Share
                                        </Button>
                                    </div>
                                </div>

                            </>
                        </MetricCard>
                    </div>
                    <div className="w-full  block md:flex my-4">
                        <MetricCard
                            className={cn('w-full max-w-full justify-between', className)} title={''} metric={undefined}                        >
                            <Title>
                                Invite with email
                            </Title>

                            <Text className="mt-3 flex items-center leading-none text-gray-500">
                                Insert your friends adresses to send them an invitation
                            </Text>
                            <>

                                <div className='flex-col w-full'>
                                    <div className="w-full block md:flex md:items-center ">
                                        <label className=" block w-full md:w-[85%] my-4">
                                            <Input
                                                type="text"
                                                // onKeyDown={handleKeyDown}

                                                placeholder="Enter email for invite"
                                                // color="text" //removed becuse of the build
                                                className="[&>label>span]:font-medium md:me-4 mb-4 md:mb-0"
                                            // {...register('title')}
                                            // error={errors?.title?.message}
                                            />

                                        </label>

                                        <Button
                                            
                                            className="@xl:w-auto dark:hover:border-gray-400 primary-dark"
                                        // onClick={() => closeModal()}
                                        >
                                            Send
                                        </Button>
                                    </div>
                                </div>

                            </>
                        </MetricCard>
                    </div>

                    {/*How its work*/}
                    <Title className="text-[18px] font-semibold my-[16px]">
                        How it works
                    </Title>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 my-6">
                        <MetricCard
                            className={cn('w-full max-w-full justify-between', className)} title={''} metric={undefined}                        >
                            <div className="flex-col">
                                <div className="mb-4">
                                    <span className="rounded-full bg-[#000000] text-white h-[10px] w-[10px] px-[10px] py-[5px] text-[11px] font-bold">
                                        1
                                    </span>
                                </div>
                                <span className="text-[14px] font-semibold mb-4">
                                    Send invite
                                </span>
                                <p className="text-[12px] font-medium">
                                    Insert your friends adresses to send them an
                                    invitation
                                </p>
                            </div>
                        </MetricCard>
                        <MetricCard
                            className={cn('w-full max-w-full justify-between', className)} title={''} metric={undefined}                        >
                            <div className="flex-col">
                                <div className="mb-4">
                                    <span className="rounded-full bg-[#000000] text-white h-[10px] w-[10px] px-[10px] py-[5px] text-[11px] font-bold">
                                        2
                                    </span>
                                </div>
                                <span className="text-[14px] font-semibold mb-4">
                                    Send invite
                                </span>
                                <p className="text-[12px] font-medium">
                                    Insert your friends adresses to send them an
                                    invitation
                                </p>
                            </div>
                        </MetricCard>
                        <MetricCard
                            className={cn('w-full max-w-full justify-between', className)} title={''} metric={undefined}                        >
                            <div className="flex-col">
                                <div className="mb-4">
                                    <span className="rounded-full bg-[#000000] text-white h-[10px] w-[10px] px-[10px] py-[5px] text-[11px] font-bold">
                                        3
                                    </span>
                                </div>
                                <span className="text-[14px] font-semibold mb-4">
                                    Send invite
                                </span>
                                <p className="text-[12px] font-medium">
                                    Insert your friends adresses to send them an
                                    invitation
                                </p>
                            </div>
                        </MetricCard>

                    </div>


                </div>
                {/*right side sections*/}
                <div className="flex-col w-full ">
                    <div className="w-full  block md:flex ">
                        <MetricCard className=" w-full " title={''} metric={undefined}>
                            <div className="flex-col">
                                <div className="mb-4">
                                    <span className=" text-[16px] font-bold">
                                        Your referral stats
                                    </span>
                                </div>
                                <ul className="list-none w-full">
                                    <li className="flex my-2">
                                        <span className="text-[14px] w-[80%]">
                                            Succesfull signups
                                        </span>
                                        <span className="text-[14px] w-[20%]">
                                            { /*
                                         //       ReferralStatisticsData?.successful_signup
                                         /*/   }
                                        </span>
                                    </li>
                                    <li className="flex my-2">
                                        <span className="text-[14px] w-[80%]">
                                            Available free subscription
                                        </span>
                                        <span className="text-[14px] w-[20%]">
                                            {
                                                //  ReferralStatisticsData?.available_free_subscription
                                            }
                                        </span>
                                    </li>
                                    <li className="flex my-2">
                                        <span className="text-[14px] w-[80%]">
                                            Used free subscription
                                        </span>
                                        <span className="text-[14px] w-[20%]">
                                            {
                                                //  ReferralStatisticsData?.used_free_subscription
                                            }
                                        </span>
                                    </li>
                                    <li className="flex my-2">
                                        <span className="text-[14px] w-[80%]">
                                            Total free subscription
                                        </span>
                                        <span className="text-[14px] w-[20%]">
                                            {
                                                //  ReferralStatisticsData?.total_free_subscription
                                            }
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </MetricCard>
                    </div>
                </div>
            </div>
        </>
    );
}