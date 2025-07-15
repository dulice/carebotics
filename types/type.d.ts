type TReport = {
  id: number;
  created_at: string;
  complaint: string;
  summary: string;
  symptom: string[];
  duration: string;
  severity: string;
  medicine: Med[];
  recommendation: string[];
};

type Med = {
  name: string;
  dose: string;
};
