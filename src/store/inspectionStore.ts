import { create } from 'zustand';

export interface InspectionData {
  id: string;
  productName: string;
  company: string;
  officerInitials: string;
  officerName: string;
  date: string;
  time: string;
  finding: 'Compliant' | 'Non-Compliant' | 'Minor' | 'Critical' | 'Pending';
  confidence: number;
  status: 'AI Review' | 'Pending' | 'Approved' | 'Rejected';
  isHighPriority: boolean;
  selected?: boolean;
  imageUri?: string;
}

const INITIAL_INSPECTIONS: InspectionData[] = [
  {
    id: 'INS-2847',
    productName: 'Amul Taaza Toned Milk 1L',
    company: 'Amul Dairy',
    officerInitials: 'AS',
    officerName: 'A. Sharma',
    date: '04 Sep 2026',
    time: '10:42 AM',
    finding: 'Non-Compliant',
    confidence: 94,
    status: 'AI Review',
    isHighPriority: true,
    selected: true,
  },
  {
    id: 'INS-2850',
    productName: 'Britannia Digestive Biscuits 200g',
    company: 'Britannia Industries',
    officerInitials: 'RV',
    officerName: 'R. Verma',
    date: '04 Sep 2026',
    time: '09:18 AM',
    finding: 'Compliant',
    confidence: 87,
    status: 'Pending',
    isHighPriority: false,
  },
  {
    id: 'INS-2849',
    productName: 'MDH Garam Masala 100g',
    company: 'MDH Spices',
    officerInitials: 'AS',
    officerName: 'A. Sharma',
    date: '04 Sep 2026',
    time: '08:55 AM',
    finding: 'Minor',
    confidence: 92,
    status: 'Approved',
    isHighPriority: false,
  },
];

interface InspectionStore {
  inspections: InspectionData[];
  addInspection: (inspection: InspectionData) => void;
}

export const useInspectionStore = create<InspectionStore>((set) => ({
  inspections: INITIAL_INSPECTIONS,
  addInspection: (inspection) => 
    set((state) => ({
      inspections: [inspection, ...state.inspections]
    })),
}));
