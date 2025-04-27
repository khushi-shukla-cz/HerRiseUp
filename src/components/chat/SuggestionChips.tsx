import React from 'react';

interface SuggestionChipsProps {
  suggestions: string[];
  onSelectSuggestion: (suggestion: string) => void;
}

const SuggestionChips: React.FC<SuggestionChipsProps> = ({ suggestions, onSelectSuggestion }) => {
  return (
    <div className="w-full py-2 overflow-x-auto whitespace-nowrap flex gap-2 no-scrollbar pb-2 -mx-1 px-1">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          className="suggestion-chip flex-shrink-0"
          onClick={() => onSelectSuggestion(suggestion)}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};

export default SuggestionChips;
