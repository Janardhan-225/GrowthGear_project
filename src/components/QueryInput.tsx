import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { processQuery, setCurrentQuery } from '../store/queriesSlice';
import { RootState } from '../types';

const QueryInput: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentQuery, loading } = useSelector((state: RootState) => state.queries);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentQuery.trim() && !loading) {
      dispatch(processQuery(currentQuery.trim()));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={currentQuery}
          onChange={(e) => dispatch(setCurrentQuery(e.target.value))}
          placeholder="Ask anything about your data..."
          className="w-full pl-12 pr-32 py-4 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!currentQuery.trim() || loading}
          className="absolute right-3 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300"
        >
          <Sparkles className="h-4 w-4" />
          <span>Analyze</span>
        </button>
      </div>
    </form>
  );
};

export default QueryInput;