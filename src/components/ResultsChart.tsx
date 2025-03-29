import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useSelector } from 'react-redux';
import { RootState } from '../types';

const ResultsChart: React.FC = () => {
  const { items, results } = useSelector((state: RootState) => state.queries);
  const latestQuery = items[0];

  if (!latestQuery || !results[latestQuery.id]) {
    return null;
  }

  const result = results[latestQuery.id];
  const data = result.data.labels.map((label, index) => ({
    name: label,
    value: result.data.values[index],
  }));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-2">Results</h3>
      <p className="text-gray-600 mb-6">{result.summary}</p>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ fill: '#2563eb' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResultsChart;