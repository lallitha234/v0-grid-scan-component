'use client';

import { useState } from 'react';
import { X, Upload, AlertCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { parseCSV } from '@/lib/csvParser';
import { Task } from '@/types';

interface ImportTasksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tasks: Omit<Task, 'id' | 'createdAt' | 'status'>[]) => void;
  eventId: string;
}

export function ImportTasksModal({
  isOpen,
  onClose,
  onSubmit,
  eventId,
}: ImportTasksModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [parseResult, setParseResult] = useState<{
    success: boolean;
    data?: Omit<Task, 'id' | 'createdAt' | 'status'>[];
    errors: string[];
    warnings: string[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setIsLoading(true);

    try {
      if (selectedFile.name.endsWith('.csv')) {
        const result = await parseCSV(selectedFile);
        if (result.success && result.data) {
          const tasksWithEventId = result.data.map((task) => ({
            ...task,
            eventId,
          }));
          setParseResult({
            ...result,
            data: tasksWithEventId,
          });
        } else {
          setParseResult(result);
        }
      } else {
        setParseResult({
          success: false,
          errors: ['Only CSV files are supported. Please use .csv format.'],
          warnings: [],
        });
      }
    } catch (error) {
      setParseResult({
        success: false,
        errors: [error instanceof Error ? error.message : 'Unknown error'],
        warnings: [],
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = () => {
    if (parseResult?.success && parseResult.data) {
      onSubmit(parseResult.data);
      setFile(null);
      setParseResult(null);
      onClose();
    }
  };

  const handleClose = () => {
    setFile(null);
    setParseResult(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
          <h2 className="text-xl font-bold">Import Tasks from CSV</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-secondary rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Expected CSV Format</h3>
              <div className="bg-secondary/50 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <pre>{`title,description,assignedTo,phone,deadline,priority
Setup venue,Book conference room,John Doe,+1234567890,2025-02-28,high
Send invitations,Email all members,Jane Smith,+1987654321,2025-02-25,high`}</pre>
              </div>
            </div>

            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-accent/50 transition-colors">
              <label htmlFor="csv-file" className="cursor-pointer">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-semibold text-foreground mb-1">
                  Click to select a CSV file or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">Supported: .csv files</p>
                <input
                  id="csv-file"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isLoading}
                />
              </label>
            </div>

            {file && (
              <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <Check className="w-5 h-5 text-green-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-green-400 truncate">{file.name}</p>
                </div>
              </div>
            )}
          </div>

          {parseResult && (
            <div className="space-y-3">
              {parseResult.errors.length > 0 && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-red-400 mb-1">Errors</p>
                      <ul className="text-sm text-red-300 space-y-1">
                        {parseResult.errors.map((error, i) => (
                          <li key={i}>• {error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {parseResult.warnings.length > 0 && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <p className="font-semibold text-yellow-400 mb-2">Warnings</p>
                  <ul className="text-sm text-yellow-300 space-y-1">
                    {parseResult.warnings.map((warning, i) => (
                      <li key={i}>• {warning}</li>
                    ))}
                  </ul>
                </div>
              )}

              {parseResult.success && parseResult.data && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="text-sm text-green-400">
                    Ready to import <strong>{parseResult.data.length}</strong> task(s)
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleImport}
              disabled={!parseResult?.success || !parseResult?.data}
              className="flex-1 bg-accent hover:bg-accent/90 disabled:opacity-50"
            >
              Import Tasks
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
