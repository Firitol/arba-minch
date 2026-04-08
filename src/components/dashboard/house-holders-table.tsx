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

interface HouseHoldersTableProps {
  data: HouseHolder[];
}

export function HouseHoldersTable({ data }: HouseHoldersTableProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterKebele, setFilterKebele] = React.useState('all');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [selectedHolder, setSelectedHolder] = React.useState<HouseHolder | null>(null);
  const { toast } = useToast();

  const filteredData = data
    .filter((holder) => {
      const matchSearch =
        holder.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        holder.houseNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchKebele =
        filterKebele === 'all' || holder.kebele === filterKebele;
      return matchSearch && matchKebele;
    })
    .sort((a, b) => a.fullName.localeCompare(b.fullName));

  const handleDeleteConfirm = () => {
    if (selectedHolder) {
      console.log('Deleting:', selectedHolder.id);
      // Here you would call your delete action/API
      toast({
        title: 'Success',
        description: `House holder ${selectedHolder.fullName} has been deleted.`,
      });
      setIsDeleteDialogOpen(false);
      setSelectedHolder(null);
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
          placeholder="Search by name or house number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filterKebele} onValueChange={setFilterKebele}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Kebele" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Kebeles</SelectItem>
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
              <TableHead>Full Name</TableHead>
              <TableHead>House Number</TableHead>
              <TableHead>Kebele</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Family Size</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((holder) => (
                <TableRow key={holder.id}>
                  <TableCell className="font-medium">{holder.fullName}</TableCell>
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
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                           <Link href={`/dashboard/house-holders/${holder.id}/edit`}>
                             <Pencil className="mr-2 h-4 w-4" />
                             Edit
                           </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => openDeleteDialog(holder)} className="text-destructive">
                           <Trash2 className="mr-2 h-4 w-4" />
                           Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the house holder record for{' '}
              <strong>{selectedHolder?.fullName}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
