'use client';

import { Button } from '@/components/ui/button';
import { Controller, SubmitHandler, useFormContext } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/spinner';
import { useModal } from '@/app/shared/modal-views/use-modal';
import cn from '@/utils/class-names';
import { Input } from '@/components/ui/input';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import { useEffect, useState } from 'react';
import { handleKeyDown } from '@/utils/common-functions';
import QuillLoader from '@/components/loader/quill-loader';
import { DatePicker } from '@/components/ui/datepicker';
import { Checkbox } from '@/components/ui/checkbox';
import Select from '@/components/ui/select';
import { getAllClient, setClientId, setClientName } from '@/redux/slices/user/client/clientSlice';
import { getAllTeamMember } from '@/redux/slices/user/team-member/teamSlice';
import moment from 'moment';
import { AddCallMeetingSchema, addCallMeetingSchema } from '@/utils/validators/add-activity.schema';
import { Text, Textarea } from 'rizzui';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { GiNotebook } from 'react-icons/gi';
import { getActivityById, getAllActivity, patchEditActivity, postAddActivity } from '@/redux/slices/user/activity/activitySlice';

const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});


export default function AddCallMeetingForm(props: any) {

  const { title, row, isClientModule, isClientEdit, isTeamEdit, clientName, clientReferenceId, isTeamModule, teamName, teamReferenceId, isAgencyTeam, isClientTeam  } = props;
  // console.log("row data....", row);

  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const router = useRouter();

  const [clientId, setClientId] = useState('');
  const [teamId, setTeamId] = useState('');
  const clientSliceData = useSelector((state: any) => state?.root?.client);
  const teamMemberData = useSelector((state: any) => state?.root?.teamMember);
  const activityData = useSelector((state: any) => state?.root?.activity);
  const signIn = useSelector((state: any) => state?.root?.signIn);

  const [isTextAreaVisible, setTextAreaVisible] = useState(false);

  const handleAddNoteClick = () => {
    setTextAreaVisible((prevVisible) => !prevVisible);
  };

  // api call for get clients and team member

  useEffect(() => {
    dispatch(getAllClient({ pagination: false, for_activity: true }))
    dispatch(getAllTeamMember({ pagination: false }))
  }, [dispatch]);

  useEffect(() => {
    isClientModule && clientReferenceId && setClientId(clientReferenceId)
  }, [clientReferenceId, isClientModule]);

  useEffect(() => {
    isTeamModule && teamReferenceId && setTeamId(teamReferenceId)
  }, [teamReferenceId, isTeamModule]);

  useEffect(() => {
    if (signIn && signIn?.teamMemberRole === 'team_member') {
      setTeamId(signIn?.user?.data?.user?.reference_id);
    }
  }, [signIn]);


  // let data = row;

  const initialValues: AddCallMeetingSchema = {
    title: '',
    description: '',
    due_date: new Date(),
    start_time: new Date(),
    end_time: new Date(),
    client: '',
    assigned: signIn?.teamMemberRole === 'team_member' ? signIn?.user?.data?.user?.name : '',
    notes: '',
    done: false
  };



  useEffect(() => {
    row && dispatch(getActivityById({ activityId: row?._id })).then((result: any) => {
      if (getActivityById.fulfilled.match(result)) {
        if (result && result.payload.success === true) {
          setClientId(result?.payload?.data[0]?.client_id);
          setTeamId(result?.payload?.data[0]?.assign_to);
        }
      }
    });
  }, [row, dispatch]);

  let [data] = activityData?.activity ?? initialValues;

  // const dueee_date = moment(data?.due_date).toDate();
  // console.log("formateedddd", moment(data?.meeting_start_time).format('hh:mm A'))

  let defaultValuess = isClientModule ? {
    title: data?.title,
    description: data?.agenda,
    // due_date: new Date(data?.due_date),
    due_date: moment(data?.due_date).toDate(),
    start_time: moment(data?.meeting_start_time).toDate(),
    end_time: moment(data?.meeting_end_time).toDate(),
    client: isClientModule ? clientName : data?.client_name,
    assigned: signIn?.teamMemberRole === 'team_member' ? signIn?.user?.data?.user?.first_name.charAt(0).toUpperCase() + signIn?.user?.data?.user?.first_name.slice(1) + " " + signIn?.user?.data?.user?.last_name.charAt(0).toUpperCase() + signIn?.user?.data?.user?.last_name.slice(1) : data?.assigned_to_name,
    done: data?.status === 'completed' ? true : false
  } : isTeamModule ? {
    title: data?.title,
    description: data?.agenda,
    // due_date: new Date(data?.due_date),
    due_date: moment(data?.due_date).toDate(),
    start_time: moment(data?.meeting_start_time).toDate(),
    end_time: moment(data?.meeting_end_time).toDate(),
    client: data?.client_name,
    assigned: isTeamModule && teamName ? teamName : data?.assigned_to_name,
    done: data?.status === 'completed' ? true : false
  } : {
    title: data?.title,
    description: data?.agenda,
    // due_date: new Date(data?.due_date),
    due_date: moment(data?.due_date).toDate(),
    start_time: moment(data?.meeting_start_time).toDate(),
    end_time: moment(data?.meeting_end_time).toDate(),
    client: data?.client_name,
    assigned: signIn?.teamMemberRole === 'team_member' ? signIn?.user?.data?.user?.first_name.charAt(0).toUpperCase() + signIn?.user?.data?.user?.first_name.slice(1) + " " + signIn?.user?.data?.user?.last_name.charAt(0).toUpperCase() + signIn?.user?.data?.user?.last_name.slice(1) : data?.assigned_to_name,
    done: data?.status === 'completed' ? true : false
  }





  let clientOptions: Record<string, any>[] = clientSliceData?.clientList && clientSliceData?.clientList?.length > 0 ? clientSliceData?.clientList?.map((client: Record<string, any>) => {
    let client_name = client?.first_name.charAt(0).toUpperCase() + client?.first_name.slice(1) + " " + client?.last_name.charAt(0).toUpperCase() + client?.last_name.slice(1);
    return { name: client_name, value: client?.reference_id, key: client }
  }) : [];

  let teamOptions: Record<string, any>[] = teamMemberData?.teamList && teamMemberData?.teamList?.length > 0 ? teamMemberData?.teamList?.map((team: Record<string, any>) => {
    let team_name = team?.first_name.charAt(0).toUpperCase() + team?.first_name.slice(1) + " " + team?.last_name.charAt(0).toUpperCase() + team?.last_name.slice(1);
    return { name: team_name, value: team?.reference_id, key: team }
  }) : [];


  const onSubmit: SubmitHandler<AddCallMeetingSchema> = (dataa) => {
    console.log('Add call meeting form dataa---->', dataa);


    const formData = {
      title: dataa?.title,
      agenda: dataa?.description,
      due_date: moment(dataa?.due_date).format('DD-MM-YYYY'),
      meeting_start_time: moment(dataa?.start_time).format('HH:mm'),
      meeting_end_time: moment(dataa?.end_time).format('HH:mm'),
      client_id: clientId,
      assign_to: teamId,
      activity_type: 'call_meeting',
      internal_info: dataa?.notes,
      mark_as_done: dataa?.done,
    }

    // console.log('Add activity form dataa---->', formData);

    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== undefined && value !== '')
    );


    if (title === 'New Activity') {
      dispatch(postAddActivity(filteredFormData)).then((result: any) => {
        if (postAddActivity.fulfilled.match(result)) {
          if (result && result.payload.success === true) {
            closeModal();
            
            if(title === 'New Activity' && isClientModule && isAgencyTeam) {
              dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', client_id: clientReferenceId, pagination: true }))
            } else if(title === 'New Activity' && !isAgencyTeam && !isTeamModule) {
              dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', client_team_id: clientReferenceId, pagination: true }))
            } else if(title === 'New Activity' && isTeamModule && isAgencyTeam) {
              dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', team_id: teamReferenceId, pagination: true }))
            } else if((title === 'New Activity' && !isClientModule) || (title === 'New Activity' && !isTeamModule)) {
              dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', pagination: true }));
            }

          }
        }
      });
    } else {
      dispatch(patchEditActivity({ ...filteredFormData, _id: data._id })).then((result: any) => {
        if (patchEditActivity.fulfilled.match(result)) {
          if (result && result.payload.success === true) {
            closeModal();

            if(title === 'Edit Activity' && isClientEdit && !isClientTeam) {
              dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', client_id: clientId, pagination: true }))
            } else if(title === 'Edit Activity' && !isClientEdit && isTeamEdit && !isClientTeam) {
              dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', team_id: teamId, pagination: true }))
            } else if(title === 'Edit Activity' && isClientEdit && isClientTeam) {
              dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', client_team_id: clientId, pagination: true }))
            } else if((title === 'Edit Activity' && !isClientEdit) || (title === 'Edit Activity' && !isTeamEdit)) {
              dispatch(getAllActivity({ sort_field: 'createdAt', sort_order: 'desc', pagination: true }));
            }

          }
        }
      });
    }

  };


  if (!activityData?.activity && title === 'Edit Activity') {
    return (
      <div className='p-10 mt-[14rem] flex items-center justify-center'>
        <Spinner size="xl" tag='div' className='ms-3' />
      </div>
    )
  } else {
    return (
      <>
        <Form<AddCallMeetingSchema>
          validationSchema={addCallMeetingSchema}
          onSubmit={onSubmit}
          useFormProps={{
            mode: 'all',
            defaultValues: defaultValuess,
          }}
          className="[&_label]:font-medium"
        >
          {({ register, control, formState: { errors }, }) => (
            <div className="space-y-5">
              {/* <div className="mb-6 flex items-center justify-between">
                <Title as="h3" className="text-xl xl:text-2xl">
                  {title}
                  New activity
                </Title>
              </div> */}
              <div>
                <div className='grid gap-5'>
                  <Input
                    type="text"
                    onKeyDown={handleKeyDown}
                    label="Title *"
                    placeholder="Enter title"
                    color="info"
                    className="[&>label>span]:font-medium"
                    {...register('title')}
                    error={errors?.title?.message}
                  />
                  <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value } }) => (
                      <QuillEditor
                        value={value}
                        onChange={onChange}
                        onKeyDown={handleKeyDown}
                        placeholder='Enter description'
                        label="Description"
                        className="col-span-full [&_.ql-editor]:min-h-[100px]"
                        labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                      />
                    )}
                  />
                  <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 items-center')}>
                    <div>
                      <Controller
                        name="due_date"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <DatePicker
                            placeholderText="Select start date"
                            selected={value}
                            inputProps={{
                              label: 'Start Date',
                              color: 'info'
                            }}
                            onChange={onChange}
                            selectsStart
                            startDate={value}
                            minDate={new Date()}
                            // showTimeSelect
                            dateFormat="MMMM dd, yyyy"
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Controller
                        name="start_time"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <DatePicker
                            placeholderText="Select start time"
                            selected={value}
                            inputProps={{
                              label: 'Start Time',
                              color: 'info'
                            }}
                            onChange={onChange}
                            showTimeSelect
                            showTimeSelectOnly
                            dateFormat="hh:mm aa"
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Controller
                        name="end_time"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <DatePicker
                            placeholderText="Select end time"
                            selected={value}
                            inputProps={{
                              label: 'End Time',
                              color: 'info'
                            }}
                            onChange={onChange}
                            showTimeSelect
                            showTimeSelectOnly
                            dateFormat="hh:mm aa"
                          />
                        )}
                      />
                    </div>
                  </div>
                  {clientSliceData?.loading ? (<SelectLoader />) : (
                    <Controller
                      control={control}
                      name="client"
                      render={({ field: { onChange, value } }) => (
                        <Select
                          options={clientOptions}
                          onChange={(selectedOption: Record<string, any>) => {
                            onChange(selectedOption?.name);
                            setClientId(selectedOption?.value);
                            // handleClientChange(selectedOption);
                          }}
                          value={value}
                          placeholder='Select Client'
                          label='Client *'
                          error={errors?.client?.message as string}
                          color='info'
                          // getOptionValue={(option) => option.value}
                          disabled={isClientModule || isClientEdit}
                          className="[&>label>span]:font-medium"
                          dropdownClassName="p-1 border w-auto border-gray-100 shadow-lg"
                        />
                      )}
                    />
                  )}
                  {teamMemberData?.loading ? (<SelectLoader />) : (
                    <Controller
                      control={control}
                      name="assigned"
                      render={({ field: { onChange, value } }) => (
                        <Select
                          options={teamOptions}
                          onChange={(selectedOption: Record<string, any>) => {
                            onChange(selectedOption?.name);
                            setTeamId(selectedOption?.value);
                            // handleTeamChange(selectedOption);
                          }}
                          value={signIn?.teamMemberRole === 'team_member' ? signIn?.user?.data?.user?.name : value}
                          placeholder='Select Team member'
                          label='Assigned *'
                          disabled={signIn?.teamMemberRole === 'team_member' || isTeamModule || isTeamEdit}
                          error={errors?.assigned?.message as string}
                          color='info'
                          // getOptionValue={(option) => option.value}
                          className="[&>label>span]:font-medium"
                          dropdownClassName="p-1 border w-auto border-gray-100 shadow-lg"
                        />
                      )}
                    />
                  )}
                  <span className="flex cursor-pointer items-center gap-2 font-medium">
                    <AiOutlineUsergroupAdd className="h-[25px] w-[25px]" />
                    <Text>Add Attendees</Text>
                  </span>
                  <span
                    className="flex cursor-pointer items-center gap-2 font-medium"
                    onClick={handleAddNoteClick}
                  >
                    <GiNotebook className="h-[25px] w-[25px]" />
                    <Text>Add Internal Note & Location</Text>
                  </span>
                  {isTextAreaVisible && (
                    <Textarea
                      placeholder="Add your internal note and location..."
                      {...register('notes')}
                      error={errors?.notes?.message as string}
                    // textareaClassName="h-20"
                    // className="col-span-2"
                    />
                  )}
                </div>
              </div>
              <div>
                <div className='flex items-center gap-[20px] pt-[0.25rem] pb-5'>
                  <div>
                    <Button
                      variant="outline"
                      className="@xl:w-auto dark:hover:border-gray-400"
                      onClick={() => closeModal()}
                    >
                      Cancel
                    </Button>
                  </div>
                  <div className='flex justify-end items-center gap-2 ms-auto'>
                    {title === 'Edit Activity' &&
                      <Checkbox
                        {...register('done')}
                        label="Mark as done"
                        color="info"
                        variant="flat"
                        className="[&>label>span]:font-medium"
                      />
                    }
                    <Button
                      type="submit"
                      className="hover:gray-700 @xl:w-auto dark:bg-gray-200 dark:text-white"
                      disabled={activityData?.loading}
                    >
                      Save
                      {activityData?.loading && <Spinner size="sm" tag='div' className='ms-3' color='white' />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Form>
      </>
    );
  }

}
