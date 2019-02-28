import React from "react";
//import ReactDOM from 'react-dom';

import LetterButton from "./LetterButton";

const AccordionStyle = {
  border: '2px dotted gray',
};

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import "../../node_modules/react-accessible-accordion/dist/fancy-example.css";

class ChartAccordion extends React.Component {
  constructor(props) {
    super(props);

    console.log("Accordion hidden manuscripts prop is " + this.props.hiddenManuscripts);

    // hiddenManuscripts and hiddenLetters should be passed in as props
    //this.onToggleManuscript = this.onToggleManuscript.bind(this);
    //this.onToggleLetter = this.onToggleLetter.bind(this);

  }

  // row = letter, column = manuscript
  // This is called from the parent (DashTabs), indicating that a row or
  // column has been hidden in the scriptchart
  onToggleManuscript( id, shelfmark ) {
    if (id in this.state.manuscriptIDs) {
      delete this.state.manuscriptIDs[id];
      this.toggleVector( "hide", "column", id, shelfmark );
    } else {
      this.state.manuscriptIDs[id] = shelfmark;
    }
  }
  onToggleLetter( id, letter ) {
    if (id in this.state.letterIDs) {
      delete this.state.letterIDs[id];
      this.toggleVector( "hide", "row", id, letter );
    } else {
      this.state.letterIDs[id] = letter;
    }
  }

  render() {
    console.log("Accordion rendering, hiddenManuscripts prop is " + this.props.hiddenManuscripts);
    return (
      <Accordion style={AccordionStyle}>
        <AccordionItem>
          <AccordionItemTitle>
            <h3 className="u-position-relative">Hidden items
              <div className="accordion__arrow" role="presentation" />
            </h3>
          </AccordionItemTitle>
          <AccordionItemBody>
            <Accordion accordion={false}>
              <AccordionItem>
                <AccordionItemTitle>
                  <h4 className="u-position-relative">Manuscripts
                    <div className="accordion__arrow" role="presentation"/>
                  </h4>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <ul>
                    { this.props.hiddenManuscripts.map(ms => {
                        return <li key={ms.id}>{ms.shelfmark}</li>
                    }) }
                  </ul>
                </AccordionItemBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemTitle>
                  <h4 className="u-position-relative">Letters
                    <div className="accordion__arrow" role="presentation" />
                  </h4>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <div className={"buttons are-small"}>
                    { this.props.hiddenLetters.map(lt => {
                        return <LetterButton key={lt.id} letter={lt.letter} />
                    }) }
                  </div>
                </AccordionItemBody>
              </AccordionItem>
            </Accordion>
          </AccordionItemBody>
        </AccordionItem>
      </Accordion>
    );
  }
}

export default ChartAccordion;
