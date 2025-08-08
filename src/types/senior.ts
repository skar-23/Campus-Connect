export interface Senior {
  id: string;
  name: string;
  branch: string;
  graduationYear: string;
  rating: number;
  totalHelped: number;
  specialties: string[];
  nativePlace: string;
  state: string;
  bio: string;
  verified: boolean;
  isPublic: boolean;
  contactNumber?: string;
  helpAreas: string[]; // New field for senior-selected help areas
}

export interface AlternativeSuggestion {
  type: string;
  text: string;
  seniors: Senior[];
  action: () => void;
}