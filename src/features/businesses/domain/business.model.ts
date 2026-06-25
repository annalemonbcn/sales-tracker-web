export type BusinessStatus =
  | 'new'
  | 'contacted'
  | 'interested'
  | 'not_interested'
  | 'follow_up'
  | 'closed';

export type BusinessPriority = 'low' | 'medium' | 'high';

// TODO: replace string for proper types from api
export type Business = {
  id: string;
  name: string;
  category: string;
  status: string;
  priority: string;
  source: string;
  notes: string | null;
  lastContactedAt: string | null;
  nextFollowUpAt: string | null;
  assignedToName: string | null;
  createdByName: string;
  createdAt: string;
  updatedAt: string;
};
