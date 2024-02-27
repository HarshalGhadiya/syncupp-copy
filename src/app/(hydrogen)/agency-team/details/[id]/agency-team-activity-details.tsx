"use client";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CustomTable from '@/components/common-tables/table';
import { deleteTask } from '@/redux/slices/user/task/taskSlice';
import { GetActivityColumns } from '@/app/shared/(user)/calender/calender-list/columns';
import { getAllActivity, setPaginationDetails } from '@/redux/slices/user/activity/activitySlice';
import cn from '@/utils/class-names';
import { Button } from 'rizzui';
import DatePeriodSelectionForm from '@/app/shared/(user)/forms/select-period-form';
import ActivitySelectionForm from '@/app/shared/(user)/forms/activity-selection-form';
import ModalButton from '@/app/shared/modal-button';
import AddActivityFormPage from '@/app/shared/(user)/calender/create-edit-event/create-edit-activity-form';
import { PiPlusBold } from 'react-icons/pi';


export default function AgencyTeamActivityTablePage(props: any) {

    const { teamId, teamName } = props;


    const dispatch = useDispatch();
    const router = useRouter();
    const signIn = useSelector((state: any) => state?.root?.signIn)
    const clientSliceData = useSelector((state: any) => state?.root?.client);
    const activityData = useSelector((state: any) => state?.root?.activity);
    const { paginationParams } = useSelector((state: any) => state?.root?.activity);

    const [pageSize, setPageSize] = useState<number>(5);
    const [activityType, setActivityType] = useState('');
    const [statusType, setStatusType] = useState('');
    const [period, setPeriod] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // console.log("Activity is....", activityData?.activityName)
    // console.log("Activity is....", activityType)
    // console.log("Start date is....", startDate)
    // console.log("End date is....", endDate)

    const handleStatusFilterApiCall = (filterStatusValue: string) => {
        setStatusType(filterStatusValue);

        dispatch(setPaginationDetails({ ...paginationParams, filter: { status: filterStatusValue, activity_type: activityType, date: period, start_date: startDate, end_date: endDate }}));

        if (signIn?.role !== 'client' && signIn?.role !== 'team_client') {
            if (activityType === '' && endDate === '' && startDate === '') {
                dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', team_id: teamId, filter: { status: filterStatusValue }, pagination: true }))
            } else if (endDate === '' && startDate === '' && activityType !== '') {
                dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', team_id: teamId, filter: { status: filterStatusValue, activity_type: activityType }, pagination: true }))
            } else if (endDate !== '' && startDate !== '' && activityType !== '') {
                dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', team_id: teamId, filter: { status: filterStatusValue, activity_type: activityType, date: period, start_date: startDate, end_date: endDate }, pagination: true }))
            } else if (endDate !== '' && startDate !== '' && activityType === '') {
                dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', team_id: teamId, filter: { status: filterStatusValue, date: period, start_date: startDate, end_date: endDate }, pagination: true }))
            }
        } else {
            if (activityType === '' && endDate === '' && startDate === '') {
                dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', agency_id: clientSliceData?.agencyId, filter: { status: filterStatusValue }, pagination: true }))
            } else if (endDate === '' && startDate === '' && activityType !== '') {
                dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', agency_id: clientSliceData?.agencyId, filter: { status: filterStatusValue, activity_type: activityType }, pagination: true }))
            } else if (endDate !== '' && startDate !== '' && activityType !== '') {
                dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', agency_id: clientSliceData?.agencyId, filter: { status: filterStatusValue, activity_type: activityType, date: period, start_date: startDate, end_date: endDate }, pagination: true }))
            } else if (endDate !== '' && startDate !== '' && activityType === '') {
                dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', agency_id: clientSliceData?.agencyId, filter: { status: filterStatusValue, date: period, start_date: startDate, end_date: endDate }, pagination: true }))
            }
        }
    }


    const handleChangePage = async (paginationParams: any) => {
        let { page, items_per_page, sort_field, sort_order, search } = paginationParams;

        dispatch(setPaginationDetails({ ...paginationParams, filter: { status: statusType, activity_type: activityType, date: period, start_date: startDate, end_date: endDate }}))

        const response = signIn?.role !== 'client' && signIn?.role !== 'team_client' ? await dispatch(getAllActivity({ page, items_per_page, sort_field, sort_order, search, team_id: teamId, filter: { status: statusType, activity_type: activityType, date: period, start_date: startDate, end_date: endDate }, pagination: true })) : await dispatch(getAllActivity({ page, items_per_page, sort_field, sort_order, search, agency_id: clientSliceData?.agencyId, team_id: teamId, filter: { status: statusType, activity_type: activityType, date: period, start_date: startDate, end_date: endDate }, pagination: true }));
        const { data } = response?.payload;
        const maxPage: number = data?.page_count;

        if (page > maxPage) {
            page = maxPage > 0 ? maxPage : 1;
            // await dispatch(getAllActivity({ page, items_per_page, sort_field, sort_order, search }));
            signIn?.role !== 'client' && signIn?.role !== 'team_client' ? await dispatch(getAllActivity({ page, items_per_page, sort_field, sort_order, search, team_id: teamId, filter: { status: statusType, activity_type: activityType, date: period, start_date: startDate, end_date: endDate }, pagination: true })) : await dispatch(getAllActivity({ page, items_per_page, sort_field, sort_order, search, agency_id: clientSliceData?.agencyId, team_id: teamId, filter: { status: statusType, activity_type: activityType, date: period, start_date: startDate, end_date: endDate }, pagination: true }));
            return data?.client
        }
        if (data && data?.client && data?.client?.length !== 0) {
            return data?.client
        }
    };

    const handleDeleteById = async (id: string | string[], currentPage?: any, countPerPage?: number, sortConfig?: Record<string, string>, searchTerm?: string) => {

        // console.log("delete id in main page....", id)

        try {
            const res = typeof id === 'string' ? await dispatch(deleteTask({ taskIdsToDelete: [id] })) : await dispatch(deleteTask({ taskIdsToDelete: id }));
            if (res.payload.success === true) {
                const reponse = signIn?.role !== 'client' && signIn?.role !== 'team_client' ? await dispatch(getAllActivity({ page: currentPage, items_per_page: countPerPage, sort_field: sortConfig?.key, sort_order: sortConfig?.direction, search: searchTerm, team_id: teamId, filter: { status: statusType, activity_type: activityType, date: period, start_date: startDate, end_date: endDate }, pagination: true })) : await dispatch(getAllActivity({ page: currentPage, items_per_page: countPerPage, sort_field: sortConfig?.key, sort_order: sortConfig?.direction, search: searchTerm, agency_id: clientSliceData?.agencyId, team_id: teamId, filter: { status: statusType, activity_type: activityType, date: period, start_date: startDate, end_date: endDate }, pagination: true }));
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <div className='mt-4'>
                <div className="ms-auto mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 xl:grid-cols-9 gap-3">
                    <Button
                        variant="outline"
                        className={cn(
                            "mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0",
                            statusType === 'todo' && 'text-white bg-black'
                        )}
                        onClick={() => handleStatusFilterApiCall("todo")}
                    >
                        To Do
                    </Button>
                    <Button
                        variant="outline"
                        className={cn(
                            "mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0",
                            statusType === 'overdue' && 'text-white bg-black'
                        )}
                        onClick={() => handleStatusFilterApiCall("overdue")}
                    >
                        Overdue
                    </Button>
                    <Button
                        variant="outline"
                        className={cn(
                            "mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0",
                            statusType === 'done' && 'text-white bg-black'
                        )}
                        onClick={() => handleStatusFilterApiCall("done")}
                    >
                        Done
                    </Button>
                    <div className='mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0 col-span-3 lg:col-span-2 md:col-span-2 sm:col-span-2'>
                        <DatePeriodSelectionForm setStartDate={setStartDate} setEndDate={setEndDate} statusType={statusType} activityType={activityType} setPeriod={setPeriod} teamId={teamId} />
                    </div>
                    <div className='mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0 col-span-3 lg:col-span-2 md:col-span-2 sm:col-span-2'>
                        <ActivitySelectionForm setActivityType={setActivityType} statusType={statusType} startDate={startDate} endDate={endDate} period={period} teamId={teamId} />
                    </div>
                    <div className='mt-5 w-full bg-none text-xs @lg:w-auto sm:text-sm lg:mt-0 col-span-3 lg:col-span-2 md:col-span-2 sm:col-span-2'>
                        <ModalButton
                            label="Add Activity"
                            view={<AddActivityFormPage title="New Activity" isTaskModule={false} isTeamModule={true} isClientModule={false} isAgencyTeam={true} teamId={teamId} teamName={teamName} />}
                            customSize="1050px"
                            className="mt-0 w-full max-h-[800px] overflow-auto bg-[#53216F] hover:bg-[#8e45b8] @lg:w-auto dark:bg-gray-100 dark:text-white dark:hover:bg-gray-200 dark:active:bg-gray-100"
                            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
                        />
                    </div>
                </div>
                <div>

                </div>
            </div>
            <div className='mt-8'>
                <CustomTable
                    data={activityData && activityData?.data?.activity}
                    total={activityData && activityData?.data?.page_count}
                    loading={activityData && activityData?.loading}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    handleDeleteById={handleDeleteById}
                    handleChangePage={handleChangePage}
                    getColumns={GetActivityColumns}
                />
            </div>
        </>
    );
}
