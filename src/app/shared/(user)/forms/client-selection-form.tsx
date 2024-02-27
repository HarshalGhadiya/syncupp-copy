'use client';

import { Form } from '@/components/ui/form';
import { getAllClient, setClientId, setClientName } from '@/redux/slices/user/client/clientSlice';
import { getAllTeamMember } from '@/redux/slices/user/team-member/teamSlice';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import Select from '@/components/ui/select';
import SelectLoader from '@/components/loader/select-loader';




export default function ClientSelectionForm() {

    const dispatch = useDispatch();
    const clientSliceData = useSelector((state: any) => state?.root?.client);
    useEffect(() => {
        dispatch(getAllClient({ pagination: false })).then((result: any) => {
            if (getAllClient.fulfilled.match(result)) {
              if (result && result?.payload?.response?.success === true ) {
                dispatch(getAllTeamMember({ sort_field: 'createdAt', sort_order: 'desc', client_id: result?.payload?.response?.data[0]?.reference_id, pagination: true, client_team: true }))
              } 
            }
          })
    }, [dispatch]);

    // console.log("Clients list....", clientSliceData?.clients)

    let initialValue: Record<string, string> = {
        client_selection: clientSliceData?.clientName ?? ''
    }

    let clientOptions: Record<string, any>[] = clientSliceData?.clientList && clientSliceData?.clientList?.length > 0 ? clientSliceData?.clientList?.map((client: Record<string, any>) => {
        let client_name = client?.first_name.charAt(0).toUpperCase() + client?.first_name.slice(1) + " " + client?.last_name.charAt(0).toUpperCase() + client?.last_name.slice(1)
        return { name: client_name, value: client?.reference_id, key: client }
    }) : [];

    // console.log(clientOptions, 'clientOptions')

    const handleClientChange = (selectedOption: Record<string, any>) => {
        // console.log("selected option....", selectedOption)
        dispatch(setClientName(selectedOption?.name))
        dispatch(setClientId(selectedOption?.value))
        dispatch(getAllTeamMember({ sort_field: 'createdAt', sort_order: 'desc', client_id: selectedOption?.value, pagination: true, client_team: true }))
    }

    const onSubmit = (data: any) => {
        // console.log('form data', data);
    };

    if (clientSliceData?.loading) {
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
                                name="client_selection"
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        options={clientOptions}
                                        onChange={(selectedOption: Record<string, any>) => {
                                            onChange(selectedOption?.name);
                                            handleClientChange(selectedOption);
                                        }}
                                        value={value}
                                        placeholder='Select Client'
                                        // getOptionValue={(option) => option.value}
                                        className="font-medium"
                                        dropdownClassName="p-1 border w-auto border-gray-100 shadow-lg"
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
