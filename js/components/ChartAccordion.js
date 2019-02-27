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

    this.state = {
      // manuscript should be keyed by column ID, value is shelfmark
      // letters should be keyed by row ID, value is letter
      manuscriptIDs: {},
      letterIDs: {},
      hiddenManuscripts : {},
      hiddenLetters : {}
    };

    this.hiddenManuscripts =  <ul>
                                <li>Manuscript 1</li>
                                <li>Manuscript 2</li>
                              </ul>;

    this.hiddenLetters = <div className={"buttons are-small"}>
                             <LetterButton key="1" letter="Letter 1" />
                             <LetterButton key="2" letter="Letter 2"/>
                           </div>;

    this.onToggleManuscript = this.onToggleManuscript.bind(this);
    this.onToggleLetter = this.onToggleLetter.bind(this);
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
                  {this.hiddenManuscripts}
                </AccordionItemBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemTitle>
                  <h4 className="u-position-relative">Letters
                    <div className="accordion__arrow" role="presentation" />
                  </h4>
                </AccordionItemTitle>
                <AccordionItemBody>
                  {this.hiddenLetters}
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
