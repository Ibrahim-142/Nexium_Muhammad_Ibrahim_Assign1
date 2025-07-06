'use client';

import { useState } from 'react';
import quotes from '../../data/quotes.json';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  topic: z.string().min(1, 'Please enter a topic.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function Home() {
  const [submittedTopic, setSubmittedTopic] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    const trimmed = data.topic.trim();
    if (quotes[trimmed as keyof typeof quotes]) {
      setSubmittedTopic(trimmed);
    } else {
      form.setError('topic', {
        type: 'manual',
        message: `No quotes found for "${trimmed}". Try: Coding, Football, Cricket, or Gaming.`,
      });
      setSubmittedTopic(null);
    }
  };

  const quotesByTopic = quotes as Record<string, string[]>;

  return (
<main className="flex-grow flex justify-center items-center px-4 mt-5">
  <div className="bg-orange-200 shadow-2xl rounded-2xl p-8 w-full max-w-md backdrop-blur-sm min-h-[400px] flex flex-col justify-between mt-8">
    
    <div>
      <h1 className="text-3xl font-bold  text-blue-950 mb-6 text-center">
        Enter a Topic 
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 "
          noValidate
        >
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <div className='mt-18'>
                <FormLabel className="text-blue-950 ">Topic</FormLabel>
                <FormControl>
                  <Input
                  placeholder="e.g. Coding, Football, Cricket, Gaming"
                  {...field}
                  className="w-full mt-2 px-4 py-3 text-sm text-blue-950 border border-blue-950 rounded-xl shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-blue-950 transition duration-200"
/>
                </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>

    <Button
      type="submit"
      onClick={form.handleSubmit(onSubmit)}
      className="w-full bg-blue-950 transition-all duration-200 hover:cursor-pointer hover:scale-105 mt-10 "
    >
      Submit
    </Button>
  </div>

  {submittedTopic && (
    <Dialog open={!!submittedTopic} onOpenChange={() => setSubmittedTopic(null)}>
      <DialogTrigger asChild>
        <div className="hidden" />
      </DialogTrigger>
      <DialogContent className='bg-orange-200'>
        <DialogHeader>
          <DialogTitle className='text-blue-950 text-xl '>Motivational Quotes - {submittedTopic}</DialogTitle>
          <DialogDescription>
            Here are 3 motivational quotes for your selected topic:
          </DialogDescription>
        </DialogHeader>
        <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
          {quotesByTopic[submittedTopic]?.map((quote, index) => (
            <li key={index} className='text-gray-800'>&quot;{quote}&quot;</li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )}
</main>

  );
}
