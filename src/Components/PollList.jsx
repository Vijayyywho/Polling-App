import React, { useEffect, useState } from "react";
import supabase from "../Supabase";
import Poll from "./Poll";

const PollList = () => {
  const [polls, setPolls] = useState([]);
  const [error, setError] = useState(null);

  const fetchPolls = async () => {
    const { data, error } = await supabase
      .from("polls")
      .select("*, options(*)")
      .order("id", { ascending: true })
      .order("id", { foreignTable: "options", ascending: true });

    if (error) {
      console.error("Error fetching polls:", error.message);
    } else {
      setPolls(data || []);
    }
  };

  useEffect(() => {
    fetchPolls();
    const interval = setInterval(fetchPolls, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {error && <p className="text-red-500 text-center">{error}</p>}
      {polls.length === 0 ? (
        <p className="text-gray-500 text-center">
          No polls available. Create one!
        </p>
      ) : (
        polls.map((poll) => (
          <Poll key={poll.id} poll={poll} onVote={fetchPolls} />
        ))
      )}
    </div>
  );
};

export default PollList;
