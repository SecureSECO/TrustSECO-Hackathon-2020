import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useRouter } from "next/router";
import { InputGroup, Button } from "react-bootstrap";
import Autosuggest from "react-autosuggest";
// import getPackagePaths from "../lib/packageData"
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";

// Imagine you have a list of languages that you'd like to autosuggest.
let packageNames;

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : packageNames.filter(
        (pack) => pack.toLowerCase().slice(0, inputLength) === inputValue
      );
};

function getSuggestionValue(suggestion) {
  return `${suggestion}`;
}

function renderSuggestion(suggestion, { query }) {
  const suggestionText = `${suggestion}`;
  console.log(suggestionText);
  const matches = AutosuggestHighlightMatch(suggestionText, query);
  const parts = AutosuggestHighlightParse(suggestionText, matches);
  // console.log(matches)
  // console.log(parts)
  return (
    <span className={"suggestion-content " + suggestion.twitter}>
      <span className="name">
        {parts.map((part, index) => {
          const className = part.highlight ? "highlight" : null;

          return (
            <span className={className} key={index}>
              {part.text}
            </span>
          );
        })}
      </span>
    </span>
  );
}

// export default class Searchbar extends React.Component {
export default function Searchbar(props) {
  // let history = useHistory();
  const router = useRouter();

  packageNames = props.packageNames;

  const [value, setValue] = useState("");
  const [name, setName] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = () => {
    if (value) {
      // window.location.href = `${
      //   window.location.hostname
      // }/TrustSECO/package/${this.state.value.toLowerCase()}`;
      router.push(`package/${value.toLowerCase()}`);
    }
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: "Package",
    value,
    onChange: onChange,
  };
  // let paths = getPackagePaths()
  // console.log("paths", paths)
  // let pathsexp = paths.map((record) => {
  //     console.log("records")
  //     console.log(record.title)
  //     return(record.title)})
  // console.log(pathsexp)
  // Finally, render it!
  return (
    <InputGroup className="searchWrap">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      <InputGroup.Append>
        <Button variant="outline-secondary" onClick={handleSubmit}>
          Search
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
}
