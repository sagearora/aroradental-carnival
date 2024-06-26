import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loader2, Plus, Minus } from 'lucide-react';
import { SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form';
import * as yup from 'yup';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import EventWaiver from '@/components/EventWaiver';

const schema = yup.object({
    full_name: yup.string().required('Full name is required'),
    email: yup.string().email().required('Email is required'),
    phone: yup.string().required('Phone number is required'),
    current_patient: yup.string().required('Please pick one'),
    guests: yup.array().of(yup.object({
        name: yup.string().required('Please provide a name for the guest'),
        age: yup.string().required('Please provide an age for the guest'),
    })).required('Please provide guest details')
}).required();

export type RegisterFormSchema = yup.InferType<typeof schema>

function RegistrationForm({
    submit,
    loading,
}: {
    submit: (values: RegisterFormSchema) => void
    loading?: boolean
}) {
    const form = useForm<RegisterFormSchema>({
        resolver: yupResolver(schema),
        defaultValues: {
            full_name: '',
            email: '',
            phone: '',
            current_patient: '',
            guests: [{ name: '', age: '' }],
        }
    });

    const full_name = useWatch({
        control: form.control,
        name: 'full_name'
    });

    const { fields, append, remove, update } = useFieldArray({
        control: form.control,
        name: 'guests',
    });

    // Update the first guest's name based on the full_name field
    useEffect(() => {
        update(0, { name: full_name, age: fields[0]?.age || '' });
    }, [full_name, update]);

    const onSubmit: SubmitHandler<RegisterFormSchema> = submit;

    const handleError = (errors: any) => {
        for (const error in errors) {
            toast({
                title: 'Missing Details',
                description: 'Please check for errors or missing information above',
                variant: 'destructive'
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, handleError)} className="space-y-4 max-w-lg mx-auto py-8">
                <div className='text-lg font-semibold text-center'>REGISTRATION FORM</div>
                <FormField
                    control={form.control}
                    name='full_name'
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Your full name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Email address</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Phone number</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                <FormField
                    control={form.control}
                    name='current_patient'
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Are you a current patient at Arora Dental?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select one" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Yes">Yes</SelectItem>
                                    <SelectItem value="No">No</SelectItem>
                                    <SelectItem value="Thinking about it :P">Thinking about it :P</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />


                <div>
                    <EventWaiver />

                </div>
                <div className="space-y-4">
                    <div className="font-semibold">Please provide guest details.</div>
                    {fields.map((field, index) => (
                        <div key={field.id} className="bg-slate-100 border shadow-md p-4 rounded-md space-y-2">
                            <div className="flex justify-between items-center">
                                <h3 className="font-medium">Guest {index + 1}</h3>
                                {index > 0 && (
                                    <Button variant="destructive" type="button" onClick={() => remove(index)}>
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                            <FormField
                                control={form.control}
                                name={`guests.${index}.name`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            <FormField
                                control={form.control}
                                name={`guests.${index}.age`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Age</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => append({ name: '', age: '' })}
                        className="w-full"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Add Another Guest
                    </Button>
                </div>

                <div className='pt-4'>
                    <Button
                        className='w-full text-2xl py-8'
                        type='submit'
                        size='lg'
                        disabled={loading}>
                        {loading ? <Loader2 className='size-8 animate-spin mr-2' /> : <svg xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24" fill="currentColor" className="size-8 mr-2">
                            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                        </svg>
                        }
                        COMPLETE REGISTRATION
                    </Button>
                    <p className="mb-4">
                        By completing registration, you are agreeing that you have read and understood the "Event Waiver" above.
                    </p>
                </div>
            </form>
        </Form>
    )
}

export default RegistrationForm;
