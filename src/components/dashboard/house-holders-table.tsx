'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { KEBELÉS } from '@/lib/constants';
import type { HouseHolder } from '@/lib/types';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/context/language-context';
import { useFirestore } from '@/firebase';
import { deleteHouseHolder } from '@/firebase/householders';

interface HouseHoldersTableProps {
  data: HouseHolder[];
}

export function HouseHoldersTable({ data }: HouseHoldersTableProps) {
  const { t } = useTranslation();
  const firestore = useFirestore();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterKebele, setFilterKebele] = React.useState('all');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [selectedHolder, setSelectedHolder] =
    React.useState<HouseHolder | null>(null);
  const { toast } = useToast();

  const filteredData = (data || [])
    .filter((holder) => {
      const matchSearch =
        holder.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        holder.houseNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchKebele =
        filterKebele === 'all' || holder.kebele === filterKebele;
      return matchSearch && matchKebele;
    })
    .sort((a, b) => a.fullName.localeCompare(b.fullName));

  const handleDeleteConfirm = async () => {
    if (selectedHolder && firestore) {
      try {
        await deleteHouseHolder(firestore, selectedHolder.id);
        toast({
          title: 'Success',
          description: t('houseHoldersTable.deleteSuccessToast', {
            fullName: selectedHolder.fullName,
          }),
        });
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message || 'Failed to delete house holder.',
        });
      } finally {
        setIsDeleteDialogOpen(false);
        setSelectedHolder(null);
      }
    }
  };

  const openDeleteDialog = (holder: HouseHolder) => {
    setSelectedHolder(holder);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder={t('houseHoldersTable.searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filterKebele} onValueChange={setFilterKebele}>
          <SelectTrigger className="w-[180px]">
            <SelectValue
              placeholder={t('houseHoldersTable.filterKebelePlaceholder')}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {t('houseHoldersTable.allKebeles')}
            </SelectItem>
            {KEBELÉS.map((kebele) => (
              <SelectItem key={kebele} value={kebele}>
                {kebele}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('houseHoldersTable.colFullName')}</TableHead>
              <TableHead>{t('houseHoldersTable.colHouseNumber')}</TableHead>
              <TableHead>{t('houseHoldersTable.colKebele')}</TableHead>
              <TableHead>{t('houseHoldersTable.colPhone')}</TableHead>
              <TableHead>{t('houseHoldersTable.colFamilySize')}</TableHead>
              <TableHead className="text-right">
                {t('houseHoldersTable.colActions')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((holder) => (
                <TableRow key={holder.id}>
                  <TableCell className="font-medium">
                    {holder.fullName}
                  </TableCell>
                  <TableCell>{holder.houseNumber}</TableCell>
                  <TableCell>{holder.kebele}</TableCell>
                  <TableCell>{holder.phone}</TableCell>
                  <TableCell>{holder.familySize}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>
                          {t('houseHoldersTable.actionsLabel')}
                        </DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/dashboard/house-holders/${holder.id}/edit`}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            {t('houseHoldersTable.edit')}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => openDeleteDialog(holder)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {t('houseHoldersTable.delete')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  {t('houseHoldersTable.noResults')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t('houseHoldersTable.deleteDialogTitle')}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t('houseHoldersTable.deleteDialogDesc')}{' '}
              <strong>{selectedHolder?.fullName}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {t('houseHoldersTable.cancel')}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              {t('houseHoldersTable.deleteConfirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
