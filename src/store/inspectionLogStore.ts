import { create } from 'zustand';

export type InspectionStatus = 'Pending' | 'Approved' | 'Rejected' | 'AI Review';

export interface InspectionLog {
  id: string;
  time: string;
  productName: string;
  companyName: string;
  officerName: string;
  status: InspectionStatus;
}

interface InspectionLogState {
  logs: InspectionLog[];
  addLog: (log: Omit<InspectionLog, 'id'>) => void;
  clearLogs: () => void;
}

const generateId = () => {
  return `INS-${Math.floor(1000 + Math.random() * 9000)}`;
};

export const useInspectionLogStore = create<InspectionLogState>((set) => ({
  logs: [], // By default there should be nothing
  
  addLog: (log) =>
    set((state) => ({
      logs: [{ ...log, id: generateId() }, ...state.logs],
    })),
    
  clearLogs: () => set({ logs: [] }),
}));
