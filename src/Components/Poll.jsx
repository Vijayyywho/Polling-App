import React from "react";
import supabase from "../Supabase";

const Poll = ({ poll, onVote }) => {
  const vote = async (optionId) => {
    const { data: optionData, error } = await supabase
      .from("options")
      .select("votes")
      .eq("id", optionId)
      .single();

    if (error) {
      console.error("Error fetching votes:", error.message);
      return;
    }

    const newVoteCount = optionData.votes + 1;

    const { error: updateError } = await supabase
      .from("options")
      .update({ votes: newVoteCount })
      .eq("id", optionId);

    if (updateError) {
      console.error("Error updating vote:", updateError.message);
      return;
    }

    onVote();
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h3 className="text-lg font-bold text-gray-800 mb-3">{poll.question}</h3>
      <div className="space-y-2">
        {poll.options
          .sort((a, b) => a.id - b.id)
          .map((option) => (
            <button
              key={option.id}
              onClick={() => vote(option.id)}
              className="block w-full p-3 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-lg transition"
            >
              {option.text} ({option.votes} votes)
            </button>
          ))}
      </div>
    </div>
  );
};

export default Poll;
