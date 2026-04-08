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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { ScrollArea } from '../ui/scroll-area';
import { Upload } from 'lucide-react';

type CsvData = Partial<HouseHolder>;

export function CsvImporter() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<CsvData[]>([]);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'text/csv') {
        setError('Please upload a valid CSV file.');
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
          // Basic validation
          const requiredFields = ['fullName', 'houseNumber', 'phone', 'familySize', 'kebele', 'latitude', 'longitude'];
          const headers = results.meta.fields || [];
          const missingFields = requiredFields.filter(field => !headers.includes(field));

          if (missingFields.length > 0) {
              setError(`CSV is missing required columns: ${missingFields.join(', ')}.`);
              setData([]);
              return;
          }
          
          const parsedData = results.data as CsvData[];
          setData(parsedData);
        },
        error: (err) => {
          setError(`Error parsing CSV: ${err.message}`);
          setData([]);
        }
      });
    }
  };

  const handleImport = () => {
    // In a real app, you would process this data and send it to your backend/Firebase.
    console.log('Importing data:', data);
    toast({
      title: 'Import Successful',
      description: `${data.length} house holder records have been prepared for import.`,
    });
    // Reset state and close dialog
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
          Import from CSV
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Import House Holders from CSV</DialogTitle>
          <DialogDescription>
            Upload a CSV file with house holder data. The file must contain the headers: fullName, houseNumber, phone, familySize, kebele, latitude, and longitude.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="csv-file">CSV File</Label>
            <Input id="csv-file" type="file" accept=".csv" onChange={handleFileChange} />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        {data.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Data Preview</h4>
            <ScrollArea className="h-72 w-full rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>House No.</TableHead>
                    <TableHead>Kebele</TableHead>
                    <TableHead>Family Size</TableHead>
                    <TableHead>Phone</TableHead>
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
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleImport} disabled={data.length === 0 || !!error}>
            Import {data.length > 0 ? data.length : ''} Records
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
