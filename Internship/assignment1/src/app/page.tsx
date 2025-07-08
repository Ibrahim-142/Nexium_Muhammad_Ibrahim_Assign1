'use client';

import { useState } from 'react';
import quotes from '../../data/quotes.json';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  topic: z.enum(['coding', 'football', 'cricket', 'gaming', 'custom'], {
    required_error: 'Please select a topic',
  }),
  customTopic: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Home() {
  const [submittedTopic, setSubmittedTopic] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: 'coding',
      customTopic: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const selected = (data.topic === 'custom'
      ? data.customTopic
      : data.topic)?.trim().toLowerCase();

    if (selected && quotes[selected as keyof typeof quotes]) {
      setSubmittedTopic(selected);
    } else {
      form.setError('customTopic', {
        type: 'manual',
        message: `No quotes found for "${selected}". Try: Coding, Football, Cricket, Gaming, Success, Discipline, or Study.`,
      });
      setSubmittedTopic(null);
    }
  };

  const quotesByTopic = quotes as Record<string, string[]>;

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-white to-blue-50">
      <div className="w-full max-w-lg p-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-8 drop-shadow">
          Motivational Quotes
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-900">Choose a Topic</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white border w-full border-blue-400 text-blue-900 rounded-xl shadow-sm focus:ring-blue-500">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="coding">Coding</SelectItem>
                      <SelectItem value="football">Football</SelectItem>
                      <SelectItem value="cricket">Cricket</SelectItem>
                      <SelectItem value="gaming">Gaming</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch('topic') === 'custom' && (
              <FormField
                control={form.control}
                name="customTopic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-900">Enter Custom Topic</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Avalible: Success, Discipline, Study"
                        {...field}
                        className="w-full px-4 py-3 border border-blue-400 rounded-xl text-blue-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button
              type="submit"
              className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold text-sm hover:scale-105 hover:bg-blue-800 transition-all duration-200 hover:cursor-pointer"
            >
              Generate Quotes
            </Button>
          </form>
        </Form>
      </div>

      {submittedTopic && (
        <Dialog open={!!submittedTopic} onOpenChange={() => setSubmittedTopic(null)}>
          <DialogTrigger asChild>
            <div className="hidden" />
          </DialogTrigger>
          <DialogContent className="bg-white/95 backdrop-blur-xl border border-blue-300 rounded-xl p-6 shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-blue-900 text-2xl font-bold">
                Quotes for &quot;{submittedTopic}&quot;
              </DialogTitle>
              <DialogDescription className="text-gray-700 mt-2">
                Here are 3 motivational quotes for your selected topic:
              </DialogDescription>
            </DialogHeader>
            <ul className="list-disc list-inside mt-4 space-y-3 text-gray-800 text-base">
              {quotesByTopic[submittedTopic]?.map((quote, index) => (
                <li key={index} className="italic">&quot;{quote}&quot;</li>
              ))}
            </ul>
          </DialogContent>
        </Dialog>
      )}
    </main>
  );
}
