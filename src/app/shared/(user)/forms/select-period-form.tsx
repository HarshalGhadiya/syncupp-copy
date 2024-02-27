'use client';

import { Form } from '@/components/ui/form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from 'next/navigation';
import { DatePicker } from '@/components/ui/datepicker';
import moment from 'moment';
import { getAllActivity, setPaginationDetails } from '@/redux/slices/user/activity/activitySlice';




export default function DatePeriodSelectionForm(props: any) {

    const { setStartDate, setEndDate, activityType, statusType, setPeriod, clientId, teamId, clientTeamId } = props;

    const dispatch = useDispatch();
    const pathname = usePathname();
    const clientSliceData = useSelector((state: any) => state?.root?.client);
    const signIn = useSelector((state: any) => state?.root?.signIn)
    const { gridView } = useSelector((state: any) => state?.root?.task);
    const { paginationParams } = useSelector((state: any) => state?.root?.activity);


    let initialValue: Record<string, string> = {
        time_selection: ''
    }

    const [startRangeDate, setStartRangeDate] = useState(null);
    const [endRangeDate, setEndRangeDate] = useState(null);
    const handleRangeChange = (dates: any) => {
        const [start, end] = dates;
        setStartRangeDate(start);
        setEndRangeDate(end);
        setStartDate(moment(start).format('DD-MM-YYYY'))
        !!end && setEndDate(moment(end).format('DD-MM-YYYY'))

        dispatch(setPaginationDetails({ ...paginationParams, page: 1, filter: { status: statusType, activity_type: activityType, date: 'period', start_date: moment(start).format('DD-MM-YYYY'), end_date: moment(end).format('DD-MM-YYYY') }}))


        if (signIn?.role !== 'client' && signIn?.role !== 'team_client') {
            !!end && dispatch(getAllActivity({ page: 1, sort_field: 'createdAt', sort_order: 'desc', client_id: clientId, team_id: teamId, client_team_id: clientTeamId, filter: { status: statusType, activity_type: activityType, date: 'period', start_date: moment(start).format('DD-MM-YYYY'), end_date: moment(end).format('DD-MM-YYYY') }, pagination: true }))
        } else {
            !!end && dispatch(getAllActivity({ page: 1, sort_field: 'createdAt', sort_order: 'desc', agency_id: clientSliceData?.agencyId, client_team_id: clientTeamId, filter: { status: statusType, activity_type: activityType, date: 'period', start_date: moment(start).format('DD-MM-YYYY'), end_date: moment(end).format('DD-MM-YYYY') }, pagination: true }))
        }

        !!end && setPeriod('period')

    };

    const onSubmit = (data: any) => {
    };

    return (
        <>
            <Form
                onSubmit={onSubmit}
                useFormProps={{
                    defaultValues: initialValue,
                    mode: 'all'
                }}
            >
                {({ control, formState: { errors } }) => (
                    <div>
                        <DatePicker
                            selected={startRangeDate}
                            onChange={handleRangeChange}
                            startDate={startRangeDate}
                            endDate={endRangeDate}
                            monthsShown={1}
                            placeholderText="Select Date in a Range"
                            className="[&>label>span]:font-medium"
                            selectsRange
                        />
                    </div>
                )}
            </Form>
        </>
    );
}
