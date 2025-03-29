import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Query, QueryResult } from '../types';

// Simulate API call with mock data
export const processQuery = createAsyncThunk(
  'queries/process',
  async (query: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
    
    // Mock data generation
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    const values = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
    
    return {
      data: { labels, values },
      summary: `Analysis based on "${query}": The data shows a ${
        values[values.length - 1] > values[0] ? 'positive' : 'negative'
      } trend over the past 5 months.`
    } as QueryResult;
  }
);

const initialState = {
  items: [] as Query[],
  currentQuery: '',
  results: {} as Record<string, QueryResult>,
  loading: false,
  error: null as string | null,
};

const queriesSlice = createSlice({
  name: 'queries',
  initialState,
  reducers: {
    setCurrentQuery: (state, action: PayloadAction<string>) => {
      state.currentQuery = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processQuery.fulfilled, (state, action) => {
        const id = Date.now().toString();
        state.items.unshift({
          id,
          text: state.currentQuery,
          timestamp: Date.now(),
          status: 'completed',
        });
        state.results[id] = action.payload;
        state.loading = false;
        state.currentQuery = '';
      })
      .addCase(processQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { setCurrentQuery, clearError } = queriesSlice.actions;
export default queriesSlice.reducer;