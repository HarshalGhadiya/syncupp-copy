'use client';

import { Title, Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import { useDispatch, useSelector } from 'react-redux';
import { putTaskStatusChange } from '@/redux/slices/user/task/taskSlice';
import { getAllActivity } from '@/redux/slices/user/activity/activitySlice';

type ConfirmationPopoverProps = {
    title?: string;
    description?: string;
    action?: string;
    icon?: React.ReactNode;
    data?: any;
    isCalendarModule?: boolean;
    isClientModule?: boolean;
    isAgencyTeamModule?: boolean;
    isClientTeamModule?: boolean;
};

export default function ConfirmationPopover({
    title,
    description,
    action,
    icon,
    data,
    isCalendarModule,
    isClientModule,
    isAgencyTeamModule,
    isClientTeamModule
}: ConfirmationPopoverProps) {

    const dispatch = useDispatch();
    const { paginationParams, userReferenceId } = useSelector((state: any) => state?.root?.activity);
    let { page, items_per_page, sort_field, sort_order, search, filter } = paginationParams;

    return (
        <Popover
            placement="left"
            className="z-50"
            content={({ setOpen }) => {

                const handleButtonClick = () => {

                    if(action === 'Complete') {
                        dispatch(putTaskStatusChange({ _id: data, status: 'completed' })).then((result: any) => {
                            if (putTaskStatusChange.fulfilled.match(result)) {
                              if (result && result.payload.success === true) {
                                isCalendarModule && dispatch(getAllActivity({ page, items_per_page, sort_field, sort_order, search, filter, pagination: true }))
                                isClientModule && dispatch(getAllActivity({ page, items_per_page, sort_field, sort_order, search, client_id: userReferenceId, filter, pagination: true }))
                                isAgencyTeamModule && dispatch(getAllActivity({ page, items_per_page, sort_field, sort_order, search, team_id: userReferenceId, filter, pagination: true }))
                                isClientTeamModule && dispatch(getAllActivity({ page, items_per_page, sort_field, sort_order, search, client_team_id: userReferenceId, filter, pagination: true }))
                              }
                            }
                          });
                    } else if(action === 'Cancel') {
                        dispatch(putTaskStatusChange({ _id: data, status: 'cancel' })).then((result: any) => {
                            if (putTaskStatusChange.fulfilled.match(result)) {
                              if (result && result.payload.success === true) {
                                isCalendarModule && dispatch(getAllActivity({ page, items_per_page, sort_field, sort_order, search, filter, pagination: true }))
                                isClientModule && dispatch(getAllActivity({ page, items_per_page, sort_field, sort_order, search, client_id: userReferenceId, filter, pagination: true }))
                                isAgencyTeamModule && dispatch(getAllActivity({ page, items_per_page, sort_field, sort_order, search, team_id: userReferenceId, filter, pagination: true }))
                                isClientTeamModule && dispatch(getAllActivity({ page, items_per_page, sort_field, sort_order, search, client_team_id: userReferenceId, filter, pagination: true }))
                              }
                            }
                          });
                    }
                    setOpen(false)
                }

                return (
                    <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
                        <Title
                            as="h6"
                            className="mb-0.5 flex items-start gap-2 text-sm text-gray-700 sm:items-center"
                        >
                            {icon} {title}
                        </Title>
                        <Text className="mb-2 leading-relaxed text-gray-500">
                            {description}
                        </Text>
                        <div className="flex items-center justify-end">
                            <Button size="sm" className="me-1.5 h-7" onClick={handleButtonClick}>
                                Yes
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-7"
                                onClick={() => setOpen(false)}
                            >
                                No
                            </Button>
                        </div>
                    </div>
                )
            }}
        >
            <Button
                size="sm"
                variant="outline"
                className="cursor-pointer hover:!border-gray-900 hover:text-gray-700 bg-white text-black"
            >
                {icon}
            </Button>
        </Popover>
    );
}
