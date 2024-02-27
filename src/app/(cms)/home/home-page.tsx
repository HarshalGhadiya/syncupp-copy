'use client';

import { SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useRouter } from 'next/navigation'
import Spinner from '@/components/ui/spinner';
import { useState } from 'react';

export default function HomePage() {
    const router = useRouter()
    const[loading, setLoading] = useState(false);
    const onSubmit: SubmitHandler<any> = (data:any) => {
        router.replace('/signin');
        setLoading(true)
    };

    return (
        <>
            <Form
                onSubmit={onSubmit}
            >
                {({ register, formState: { errors } }) => (
                    <div className="space-y-5 p-3">
                        <Button
                            className="border-2 border-primary-light text-base font-bold float-right"
                            type="submit"
                            color="info"
                            rounded="pill"
                        >
                            Sign in 
                            {loading && <Spinner size="sm" tag='div' className='ms-3' color='white' />}
                        </Button>
                    </div>
                )}
            </Form>
        </>
    );
}