import React, { useState } from 'react';
import { FiUsers } from 'react-icons/fi';
import { FaVolleyball } from "react-icons/fa6";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

const App: React.FC = () => {
  const [participants, setParticipants] = useState<string>('');
  const [teams, setTeams] = useState<number>(2);
  const [result, setResult] = useState<string[][]>([]);
  const [showTeams, setShowTeams] = useState(false);

  const handleSortTeams = () => {
    const names = participants.split(',').map(name => name.trim()).filter(name => name);
    const shuffledNames = names.sort(() => Math.random() - 0.5);
    const teamSize = Math.ceil(shuffledNames.length / teams);
    const sortedTeams = Array.from({ length: teams }, (_, i) =>
      shuffledNames.slice(i * teamSize, (i + 1) * teamSize)
    );
    setResult(sortedTeams);
    setShowTeams(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-500 to-blue-800 flex flex-col items-center justify-center text-white font-sans space-y-8 p-4">
      <h1 className="text-5xl font-extrabold drop-shadow-lg text-center animate-fadeIn">
        <FaVolleyball className="inline mr-2" /> Quase olímpicos
      </h1>

      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 space-y-6 text-gray-800 animate-fadeIn">
        <textarea
          className="w-full h-28 p-4 rounded-xl border-2 border-gray-300 focus:border-teal-500 outline-none transition-all"
          placeholder="Digite os nomes"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
        />

        <div className="flex items-center justify-between">
          <label className="font-semibold text-gray-600 text-lg">Número de Times:</label>
          <input
            type="number"
            min="2"
            value={teams}
            onChange={(e) => setTeams(Number(e.target.value))}
            className="w-16 p-2 rounded-xl border-2 border-gray-300 focus:border-teal-500 outline-none transition-all"
          />
        </div>

        <button
          onClick={handleSortTeams}
          className="w-full py-3 font-bold text-white bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl hover:from-blue-500 hover:to-teal-500 shadow-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
        >
          <GiPerspectiveDiceSixFacesRandom className="text-2xl" />
          <span>Sortear Times</span>
        </button>
      </div>

      {showTeams && (
        <div className="w-full max-w-4xl mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
          {result.map((team, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-3xl shadow-lg text-gray-800 transform hover:scale-105 transition-all duration-200 hover:shadow-2xl"
            >
              <h2 className="text-2xl font-semibold text-teal-600 mb-4 flex items-center">
                <FiUsers className="mr-2 text-teal-500" />
                Time {index + 1}
              </h2>
              <ul className="space-y-2">
                {team.map((member, idx) => (
                  <li key={idx} className="text-gray-700 font-medium bg-gray-100 p-2 rounded-lg">
                    {member}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
