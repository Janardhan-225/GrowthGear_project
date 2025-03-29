export interface Query {
  id: string;
  text: string;
  timestamp: number;
  status: 'pending' | 'completed' | 'error';
}

export interface QueryResult {
  data: {
    labels: string[];
    values: number[];
  };
  summary: string;
}

export interface RootState {
  queries: {
    items: Query[];
    currentQuery: string;
    results: Record<string, QueryResult>;
    loading: boolean;
    error: string | null;
  };
}