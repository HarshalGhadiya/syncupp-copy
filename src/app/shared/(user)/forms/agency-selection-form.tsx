'use client';

import { Form } from '@/components/ui/form';
import { getClientAgencies, setAgencyId, setAgencyName } from '@/redux/slices/user/client/clientSlice';
import { getAllTeamMember } from '@/redux/slices/user/team-member/teamSlice';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import Select from '@/components/ui/select';
import SelectLoader from '@/components/loader/select-loader';
import { usePathname } from 'next/navigation';
import { getAllTask } from '@/redux/slices/user/task/taskSlice';
import { getAllActivity } from '@/redux/slices/user/activity/activitySlice';


export default function AgencySelectionForm() {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const clientSliceData = useSelector((state: any) => state?.root?.client);
    const { gridView } = useSelector((state: any) => state?.root?.task);
    const { calendarView } = useSelector((state: any) => state?.root?.activity);


    useEffect(() => { dispatch(getClientAgencies()) }, [dispatch]);
    let initialValue: Record<string, string> = {
        agency_selection: clientSliceData?.agencyName ?? ''
    }

    let agencyOptions: Record<string, any>[] = clientSliceData?.agencies && clientSliceData?.agencies?.length > 0 ? clientSliceData?.agencies?.map((agency: Record<string, string>) => {
        let agency_name = agency?.first_name.charAt(0).toUpperCase() + agency?.first_name.slice(1) + " " + agency?.last_name.charAt(0).toUpperCase() + agency?.last_name.slice(1)
        return { name: agency_name, value: agency?.reference_id, key: agency }
    }) : [];

    const handleAgencyChange = (selectedOption: Record<string, any>) => {
        dispatch(setAgencyName(selectedOption?.name))
        dispatch(setAgencyId(selectedOption?.value))
        // console.log("pathname...", pathname)
        if(pathname === "/team") {
            dispatch(getAllTeamMember({
                sort_field: 'createdAt',
                sort_order: 'desc',
                agency_id: selectedOption?.value,
                pagination: true
            }));
        } else if(pathname === "/tasks") {
            !gridView ? dispatch(getAllTask({ sort_field: 'createdAt', sort_order: 'desc', agency_id: selectedOption?.value, pagination: true })) : dispatch(getAllTask({ pagination: false, agency_id: selectedOption?.value }))
        } else if(pathname === "/calendar") {
            !calendarView ? dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', agency_id: selectedOption?.value, pagination: true })) : dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', agency_id: selectedOption?.value, pagination: false }))
        } else if(pathname.startsWith('/team/details')) {
            dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', agency_id: selectedOption?.value, client_team_id: clientSliceData?.clientTeamId, pagination: true }))
        }
    }

    const onSubmit = (data: any) => {
    };

    if (clientSliceData?.agencies?.length === 0) {
        return <SelectLoader />
    } else {
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
                        <div className="w-[10rem] float-right">
                            <Controller
                                control={control}
                                name="agency_selection"
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        options={agencyOptions}
                                        onChange={(selectedOption: Record<string, any>) => {
                                            onChange(selectedOption?.name);
                                            handleAgencyChange(selectedOption);
                                        }}
                                        value={value}
                                        placeholder='Select Agency'
                                        // getOptionValue={(option) => option.value}
                                        className="font-medium"
                                        dropdownClassName="p-1 border w-auto border-gray-100 shadow-lg absolute"
                                    />
                                )}
                            />
                        </div>
                    )}
                </Form>
            </>
        );
    }
}
