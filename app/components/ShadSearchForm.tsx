'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppDispatch } from '../Store/hook';
import { fetchForecast } from '../Store/slices/forecastSlice';

const formSchema = z.object({
  city: z.string().min(3, {
    message: 'City must be at least 3 characters in order to search',
  }),
});

function ShadSearchForm() {
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(fetchForecast(values.city));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Search:</FormLabel>
              <FormControl>
                <Input placeholder="Enter a city to see forecast" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Search</Button>
      </form>
    </Form>
  );
}

export default ShadSearchForm;
