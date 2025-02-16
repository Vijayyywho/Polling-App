import React from "react";
import { useState } from "react";
import supabase from "../Supabase";

const PollForm = ({ onPollCreated }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const addOption = () => setOptions([...options, ""]);
  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const createPoll = async () => {
    if (!question.trim() || options.some((opt) => !opt.trim())) {
      return alert("Please fill in all fields.");
    }

    const { data, error } = await supabase
      .from("polls")
      .insert([{ question }])
      .select()
      .single();

    if (error) return alert("Error creating poll");

    const pollId = data.id;
    const optionsData = options.map((text) => ({
      poll_id: pollId,
      text,
      votes: 0,
    }));

    await supabase.from("options").insert(optionsData);
    onPollCreated();
    setQuestion("");
    setOptions(["", ""]);
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Create a Poll
      </h2>
      <input
        type="text"
        placeholder="Poll Question"
        className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Option ${index + 1}`}
          className="border border-gray-300 p-3 w-full mt-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={option}
          onChange={(e) => updateOption(index, e.target.value)}
        />
      ))}
      <div className="flex gap-3 mt-3">
        <button
          onClick={addOption}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          + Add Option
        </button>
        <button
          onClick={createPoll}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Create Poll
        </button>
      </div>
    </div>
  );
};

export default PollForm;
