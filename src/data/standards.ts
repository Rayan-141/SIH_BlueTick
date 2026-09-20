export interface StandardGuide {
  id: string;
  icon: 'camera-alt' | 'qr-code-scanner' | 'psychology' | 'rule' | 'restaurant' | 'assessment' | 'verified-user';
  title: string;
  summary: string;
  checks: string[];
  reference: string;
}

export const STANDARD_GUIDES: StandardGuide[] = [
  {
    id: 'capture',
    icon: 'camera-alt',
    title: 'Camera & Image Capture',
    summary: 'Ensures the label image is clear enough for reliable inspection.',
    checks: ['Focus and lighting', 'Complete label visibility', 'Blur and glare detection'],
    reference: 'Capture quality rule',
  },
  {
    id: 'ocr',
    icon: 'qr-code-scanner',
    title: 'Barcode & OCR Reading',
    summary: 'Reads printed text and product codes from the scanned package.',
    checks: ['Product name and brand', 'Batch, date and quantity fields', 'Barcode and licence number'],
    reference: 'Data extraction rule',
  },
  {
    id: 'ai-review',
    icon: 'psychology',
    title: 'AI/ML Label Analysis',
    summary: 'Compares extracted label information with the relevant compliance rules.',
    checks: ['Field classification', 'Missing or inconsistent declarations', 'Confidence and review flags'],
    reference: 'AI-assisted review',
  },
  {
    id: 'legal-metrology',
    icon: 'rule',
    title: 'Legal Metrology Checks',
    summary: 'Checks declarations commonly required for packaged commodities.',
    checks: ['Manufacturer or importer details', 'Net quantity and maximum retail price', 'Consumer care information'],
    reference: 'Legal Metrology rules',
  },
  {
    id: 'food-safety',
    icon: 'restaurant',
    title: 'Food Safety Checks',
    summary: 'Checks food-label declarations when the scanned product is a food item.',
    checks: ['FSSAI licence details', 'Ingredients and allergens', 'Nutrition and date declarations'],
    reference: 'FSSAI labelling rules',
  },
  {
    id: 'rating',
    icon: 'assessment',
    title: 'Compliance Rating',
    summary: 'Turns rule results into a clear inspection status for the officer.',
    checks: ['Compliant', 'Non-compliant', 'Needs review when evidence is incomplete'],
    reference: 'CheckMate rating logic',
  },
  {
    id: 'verification',
    icon: 'verified-user',
    title: 'Officer Verification',
    summary: 'Keeps the officer in control of the final inspection decision.',
    checks: ['Review extracted evidence', 'Confirm or correct findings', 'Maintain an inspection record'],
    reference: 'Human verification step',
  },
];
