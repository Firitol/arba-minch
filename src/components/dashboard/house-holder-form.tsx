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
import { useTranslation } from '@/context/language-context';
import { useFirestore } from '@/firebase';
import { addHouseHolder, updateHouseHolder } from '@/firebase/householders';
import { Loader2 } from 'lucide-react';

interface HouseHolderFormProps {
  houseHolder?: HouseHolder;
}

export function HouseHolderForm({ houseHolder }: HouseHolderFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const firestore = useFirestore();
  const { t } = useTranslation();
  const isEditMode = !!houseHolder;

  const formSchema = z.object({
    fullName: z.string().min(2, {
      message: t('holderForm.fullNameMinCharsError'),
    }),
    houseNumber: z.string().min(1, { message: t('holderForm.houseNumberRequiredError') }),
    phone: z
      .string()
      .regex(/^09\d{8}$/, { message: t('holderForm.phoneInvalidError') }),
    familySize: z.coerce.number().int().min(1, { message: t('holderForm.familySizeMinError') }),
    kebele: z.string({ required_error: t('holderForm.kebeleRequiredError') }),
    latitude: z.number(),
    longitude: z.number(),
  });

  type HouseHolderFormValues = z.infer<typeof formSchema>;

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

  async function onSubmit(values: HouseHolderFormValues) {
    if (!firestore) return;
    form.formState.isSubmitting = true;

    try {
      if (isEditMode && houseHolder?.id) {
        await updateHouseHolder(firestore, houseHolder.id, values);
        toast({
          title: t('holderForm.successToastTitle', { action: t('holderForm.actionUpdated') }),
          description: t('holderForm.successToastDesc', { fullName: values.fullName, action: t('holderForm.actionUpdated') }),
        });
      } else {
        await addHouseHolder(firestore, values);
        toast({
          title: t('holderForm.successToastTitle', { action: t('holderForm.actionCreated') }),
          description: t('holderForm.successToastDesc', { fullName: values.fullName, action: t('holderForm.actionCreated') }),
        });
      }
      router.push('/dashboard/house-holders');
      router.refresh();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'An unexpected error occurred.',
      });
    } finally {
        form.formState.isSubmitting = false;
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{t('holderForm.detailsTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('holderForm.fullNameLabel')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('holderForm.fullNamePlaceholder')} {...field} />
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
                    <FormLabel>{t('holderForm.houseNumberLabel')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('holderForm.houseNumberPlaceholder')} {...field} />
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
                    <FormLabel>{t('holderForm.phoneLabel')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('holderForm.phonePlaceholder')} {...field} />
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
                    <FormLabel>{t('holderForm.familySizeLabel')}</FormLabel>
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
                    <FormLabel>{t('holderForm.kebeleLabel')}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('holderForm.kebelePlaceholder')} />
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
              <CardTitle>{t('holderForm.locationTitle')}</CardTitle>
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
                      <FormLabel>{t('holderForm.latitudeLabel')}</FormLabel>
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
                      <FormLabel>{t('holderForm.longitudeLabel')}</FormLabel>
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
            disabled={form.formState.isSubmitting}
          >
            {t('holderForm.cancel')}
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditMode ? t('holderForm.update') : t('holderForm.create')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
