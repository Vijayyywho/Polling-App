import React from "react";
import PollForm from "./Components/PollForm";
import PollList from "./Components/PollList";
import { useState } from "react";
import "./index.css";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-3xl">
        <div className="bg-blue-600  mb-5 text-white text-center py-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold">Quick Polling App</h1>
        </div>

        <PollForm onPollCreated={() => setRefresh(!refresh)} />

        <div className="mt-8">
          <PollList key={refresh} />
        </div>
      </div>
    </div>
  );
}

export default App;
