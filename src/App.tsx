import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import QueryInput from './components/QueryInput';
import QueryHistory from './components/QueryHistory';
import ResultsChart from './components/ResultsChart';
import { Database } from 'lucide-react';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Database className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Data Query Dashboard</h1>
          </div>
          <p className="text-gray-600">
            Ask questions about your data using natural language and get instant insights
          </p>
        </header>

        <div className="mb-8">
          <QueryInput />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ResultsChart />
          </div>
          <div>
            <QueryHistory />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;