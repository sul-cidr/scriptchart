import React from "react";

import LetterButton from "./LetterButton";
import SyriacLetter from "./SyriacLetter";
import ManuscriptItem from "./ManuscriptItem";

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
  }

  render() {
    return (
      <Accordion style={AccordionStyle} accordion={false}>
        <AccordionItem expanded={(this.props.hiddenManuscripts.length > 0)}>
          <AccordionItemTitle>
            <h4 className="u-position-relative">Columns (manuscripts)
              <div className="accordion__arrow" role="presentation"/>
            </h4>
          </AccordionItemTitle>
          <AccordionItemBody>
            <ul>
              { this.props.hiddenManuscripts.map(msid => {
                  let msIndex = this.props.columnManuscripts.findIndex(m => m['id'] == msid);
                  return <ManuscriptItem key={msid} manuscriptID={msid} onHiddenChange={this.props.onHiddenChange} display={this.props.columnManuscripts[msIndex]['shelfmark']} />
              }) }
            </ul>
          </AccordionItemBody>
        </AccordionItem>
        <AccordionItem expanded={(this.props.hiddenLetters.length > 0)}>
          <AccordionItemTitle>
            <h4 className="u-position-relative">Rows (letters, dates)
              <div className="accordion__arrow" role="presentation" />
            </h4>
          </AccordionItemTitle>
          <AccordionItemBody>
            <div className={"buttons are-small"}>
              { this.props.hiddenLetters.map(ltid => {
                  return <LetterButton key={ltid} letterID={ltid} onHiddenChange={this.props.onHiddenChange} letter={<SyriacLetter id={ltid} />} />
              }) }
            </div>
          </AccordionItemBody>
        </AccordionItem>
      </Accordion>
    );
  }
}

export default ChartAccordion;
