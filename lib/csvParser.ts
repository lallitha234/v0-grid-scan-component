import { ImportedTask, TaskPriority } from '@/types';
import { isPriority, isValidDate } from './taskUtils';

export interface ParseResult {
  success: boolean;
  data?: ImportedTask[];
  errors: string[];
  warnings: string[];
}

export async function parseCSV(file: File): Promise<ParseResult> {
  const errors: string[] = [];
  const warnings: string[] = [];
  const data: ImportedTask[] = [];

  try {
    const text = await file.text();
    const lines = text.split('\n').filter((line) => line.trim());

    if (lines.length < 2) {
      errors.push('CSV file must contain headers and at least one data row');
      return { success: false, errors, warnings };
    }

    const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
    const requiredFields = ['title', 'assignedto', 'phone', 'deadline'];
    const missingFields = requiredFields.filter((field) => !headers.includes(field));

    if (missingFields.length > 0) {
      errors.push(`Missing required columns: ${missingFields.join(', ')}`);
      return { success: false, errors, warnings };
    }

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map((v) => v.trim());
      
      if (values.length < requiredFields.length) {
        warnings.push(`Row ${i + 1}: Skipped - insufficient data`);
        continue;
      }

      const row: Record<string, string> = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });

      // Validate required fields
      if (!row['title']) {
        warnings.push(`Row ${i + 1}: Missing title`);
        continue;
      }
      if (!row['phone']) {
        warnings.push(`Row ${i + 1}: Missing phone number`);
        continue;
      }
      if (!row['deadline'] || !isValidDate(row['deadline'])) {
        warnings.push(`Row ${i + 1}: Invalid or missing deadline`);
        continue;
      }
      if (!row['assignedto']) {
        warnings.push(`Row ${i + 1}: Missing assigned person name`);
        continue;
      }

      let priority: TaskPriority = 'medium';
      if (row['priority']) {
        if (isPriority(row['priority'])) {
          priority = row['priority'];
        } else {
          warnings.push(`Row ${i + 1}: Invalid priority, using "medium"`);
        }
      }

      data.push({
        title: row['title'],
        description: row['description'] || '',
        assignedTo: row['assignedto'],
        phone: row['phone'],
        deadline: new Date(row['deadline']).toISOString(),
        priority,
      });
    }

    if (data.length === 0) {
      errors.push('No valid tasks found in CSV');
      return { success: false, errors, warnings };
    }

    return { success: true, data, errors, warnings };
  } catch (error) {
    errors.push(`Error parsing CSV: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return { success: false, errors, warnings };
  }
}

export async function parseXLSX(file: File): Promise<ParseResult> {
  // For now, we'll return a message that XLSX needs additional library
  // In production, use xlsx library
  return {
    success: false,
    errors: ['XLSX support requires additional setup. Please use CSV format.'],
    warnings: [],
  };
}
