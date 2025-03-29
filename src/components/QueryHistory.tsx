import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../types';

const QueryHistory: React.FC = () => {
  const { items } = useSelector((state: RootState) => state.queries);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5 text-gray-600" />
        Query History
      </h2>
      <div className="space-y-4">
        {items.map((query) => (
          <div
            key={query.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {query.status === 'completed' ? (
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            )}
            <div>
              <p className="text-gray-800">{query.text}</p>
              <p className="text-sm text-gray-500">
                {new Date(query.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-gray-500 text-center py-4">No queries yet</p>
        )}
      </div>
    </div>
  );
};

export default QueryHistory;