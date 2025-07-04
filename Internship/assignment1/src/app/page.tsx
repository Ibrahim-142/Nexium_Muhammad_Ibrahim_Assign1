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
  <div className="bg-white/90 shadow-2xl rounded-2xl p-8 w-full max-w-md backdrop-blur-sm min-h-[400px] flex flex-col justify-between">
    
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Enter a Topic
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <div className='mt-18'>
                <FormLabel className="text-gray-700 ">Topic</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Coding, Football,Cricket,Gaming "
                    {...field}
                    className="w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-4"
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
      className="w-full transition-all duration-200 hover:cursor-pointer hover:scale-105 mt-10"
    >
      Submit
    </Button>
  </div>

  {submittedTopic && (
    <Dialog open={!!submittedTopic} onOpenChange={() => setSubmittedTopic(null)}>
      <DialogTrigger asChild>
        <div className="hidden" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Motivational Quotes - {submittedTopic}</DialogTitle>
          <DialogDescription>
            Here are 3 motivational quotes for your selected topic:
          </DialogDescription>
        </DialogHeader>
        <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
          {quotesByTopic[submittedTopic]?.map((quote, index) => (
            <li key={index}>&quot;{quote}&quot;</li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )}
</main>

  );
}
