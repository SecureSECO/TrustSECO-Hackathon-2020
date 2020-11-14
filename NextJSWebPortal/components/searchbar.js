import React from "react";
import { useHistory } from "react-router-dom";
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

export default class Searchbar extends React.Component {
  constructor(props) {
    super();
    packageNames = props.packageNames;
    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: "",
      suggestions: [],
    };
  }
  handleSubmit = () => {
    if (this.state.value) {
      window.location = `TrustSECO/package/${this.state.value.toLowerCase()}`;
    }
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Package",
      value,
      onChange: this.onChange,
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
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={this.handleSubmit}>
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}
