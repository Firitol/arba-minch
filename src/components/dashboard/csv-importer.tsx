'use client';

import { useState } from 'react';
import Papa from 'papaparse';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { HouseHolder } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { ScrollArea } from '../ui/scroll-area';
import { Upload } from 'lucide-react';
import { useTranslation } from '@/context/language-context';

type CsvData = Partial<HouseHolder>;

export function CsvImporter() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<CsvData[]>([]);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'text/csv') {
        setError(t('csvImporter.fileTypeError'));
        setFile(null);
        setData([]);
        return;
      }
      setFile(selectedFile);
      setError('');

      Papa.parse(selectedFile, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const requiredFields = [
            'fullName',
            'houseNumber',
            'phone',
            'familySize',
            'kebele',
            'latitude',
            'longitude',
          ];
          const headers = results.meta.fields || [];
          const missingFields = requiredFields.filter(
            (field) => !headers.includes(field)
          );

          if (missingFields.length > 0) {
            setError(
              t('csvImporter.missingColsError', {
                fields: missingFields.join(', '),
              })
            );
            setData([]);
            return;
          }

          const parsedData = results.data as CsvData[];
          setData(parsedData);
        },
        error: (err) => {
          setError(t('csvImporter.parsingError', { message: err.message }));
          setData([]);
        },
      });
    }
  };

  const handleImport = () => {
    console.log('Importing data:', data);
    toast({
      title: t('csvImporter.importSuccessToastTitle'),
      description: t('csvImporter.importSuccessToastDesc', {
        count: data.length,
      }),
    });
    setOpen(false);
    setFile(null);
    setData([]);
    setError('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          {t('csvImporter.button')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{t('csvImporter.dialogTitle')}</DialogTitle>
          <DialogDescription>
            {t('csvImporter.dialogDescription')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="csv-file">{t('csvImporter.fileLabel')}</Label>
            <Input
              id="csv-file"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        {data.length > 0 && (
          <div>
            <h4 className="mb-2 font-medium">{t('csvImporter.previewTitle')}</h4>
            <ScrollArea className="h-72 w-full rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('csvImporter.colFullName')}</TableHead>
                    <TableHead>{t('csvImporter.colHouseNumber')}</TableHead>
                    <TableHead>{t('csvImporter.colKebele')}</TableHead>
                    <TableHead>{t('csvImporter.colFamilySize')}</TableHead>
                    <TableHead>{t('csvImporter.colPhone')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.fullName}</TableCell>
                      <TableCell>{row.houseNumber}</TableCell>
                      <TableCell>{row.kebele}</TableCell>
                      <TableCell>{row.familySize}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {t('csvImporter.cancel')}
          </Button>
          <Button
            onClick={handleImport}
            disabled={data.length === 0 || !!error}
          >
            {t('csvImporter.importButton', { count: data.length > 0 ? data.length : '' })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
