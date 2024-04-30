import React from 'react';
import { useNavigate } from 'react-router-dom';

const Account = () => {

  const navigate = useNavigate()

  return (
    <div className="container mx-auto mt-10">
      <div className="grid grid-cols-2 gap-8">
        {/* Box 1: Books */}
        <div className="rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-t-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Books</h2>
          </div>
          {/* Additional content for Books can be added here */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-b-lg">
            {/* Additional content for Books can be added here */}
          </div>
        </div>

        {/* Box 2: Health */}
        <div className="rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-t-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Health</h2>
          </div>
          {/* Additional content for Health can be added here */}
          <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-b-lg">
            {/* Additional content for Health can be added here */}
          </div>
        </div>

        {/* Box 3: Goals */}
        <div className="rounded-lg shadow-md overflow-hidden" onClick={() => navigate("/goals")}>
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 rounded-t-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Goals</h2>
          </div>
          {/* Additional content for Goals can be added here */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 rounded-b-lg">
            {/* Additional content for Goals can be added here */}
          </div>
        </div>

        {/* Box 4: Reflections */}
        <div className="rounded-lg shadow-md overflow-hidden" onClick={() => navigate("/notes")}>
          <div className="bg-gradient-to-r from-purple-400 to-purple-600 p-6 rounded-t-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Reflections</h2>
          </div>
          {/* Additional content for Reflections can be added here */}
          <div className="bg-gradient-to-r from-purple-400 to-purple-600 p-6 rounded-b-lg">
            {/* Additional content for Reflections can be added here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;