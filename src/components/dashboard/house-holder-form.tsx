'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KEBELÉS } from '@/lib/constants';
import type { HouseHolder } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { LocationPicker } from '../map/location-picker';
import { useState } from 'react';

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Full name must be at least 2 characters.',
  }),
  houseNumber: z.string().min(1, { message: 'House number is required.' }),
  phone: z
    .string()
    .regex(/^09\d{8}$/, { message: 'Invalid Ethiopian phone number.' }),
  familySize: z.coerce.number().int().min(1, { message: 'Family size must be at least 1.' }),
  kebele: z.string({ required_error: 'Please select a kebele.' }),
  latitude: z.number(),
  longitude: z.number(),
});

type HouseHolderFormValues = z.infer<typeof formSchema>;

interface HouseHolderFormProps {
  houseHolder?: HouseHolder;
}

export function HouseHolderForm({ houseHolder }: HouseHolderFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const isEditMode = !!houseHolder;

  const form = useForm<HouseHolderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: houseHolder?.fullName || '',
      houseNumber: houseHolder?.houseNumber || '',
      phone: houseHolder?.phone || '',
      familySize: houseHolder?.familySize || 1,
      kebele: houseHolder?.kebele || '',
      latitude: houseHolder?.latitude || 6.03,
      longitude: houseHolder?.longitude || 37.55,
    },
  });

  const [location, setLocation] = useState({
    lat: form.getValues('latitude'),
    lng: form.getValues('longitude'),
  });

  function onSubmit(values: HouseHolderFormValues) {
    // In a real app, you'd submit this to Firebase/backend
    console.log(values);
    toast({
      title: `Success: ${isEditMode ? 'Updated' : 'Created'}`,
      description: `House holder ${values.fullName} has been successfully ${
        isEditMode ? 'updated' : 'created'
      }.`,
    });
    router.push('/dashboard/house-holders');
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>House Holder Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Abebe Kebede" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="houseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>House Number</FormLabel>
                    <FormControl>
                      <Input placeholder="ABM-123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="0912345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="familySize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Family Size</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kebele"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kebele / Area</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a kebele" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {KEBELÉS.map((kebele) => (
                          <SelectItem key={kebele} value={kebele}>
                            {kebele}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <LocationPicker
                 position={location}
                 onPositionChange={(pos) => {
                   form.setValue('latitude', pos.lat, { shouldValidate: true });
                   form.setValue('longitude', pos.lng, { shouldValidate: true });
                   setLocation(pos);
                 }}
               />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="latitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Latitude</FormLabel>
                      <FormControl>
                        <Input type="number" readOnly {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="longitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Longitude</FormLabel>
                      <FormControl>
                        <Input type="number" readOnly {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit">{isEditMode ? 'Update' : 'Create'}</Button>
        </div>
      </form>
    </Form>
  );
}
