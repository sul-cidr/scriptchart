import React from "react";

/* ChartAccordion - This collapsible accordion menu, built on
 * react-acessible-accordion, lives under the "Hidden Items"
 * tab. It displays manuscript and letter items for the columns
 * and rows that have been hidden on the scriptchart, and
 * signals the scriptchart to redisplay them when they are
 * selected.
 */

import LetterButton from "./LetterButton";
import SyriacLetter from "./SyriacLetter";
import ManuscriptItem from "./ManuscriptItem";

const AccordionStyle = {
  border: "2px dotted gray"
};

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";

import "../../node_modules/react-accessible-accordion/dist/fancy-example.css";

class ChartAccordion extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Accordion style={AccordionStyle} accordion={false}>
        <AccordionItem expanded={this.props.hiddenManuscripts.length > 0}>
          <AccordionItemTitle>
            <h4 className="u-position-relative">
              Columns (manuscripts)
              <div className="accordion__arrow" role="presentation" />
            </h4>
          </AccordionItemTitle>
          <AccordionItemBody>
            <ul>
              {this.props.hiddenManuscripts.map(msid => (
                <ManuscriptItem
                  key={msid}
                  manuscriptID={msid}
                  onHiddenChange={this.props.onHiddenChange}
                  display={
                    this.props.columnManuscripts.find(m => m.id == msid)
                      .shelfmark
                  }
                />
              ))}
            </ul>
          </AccordionItemBody>
        </AccordionItem>
        <AccordionItem expanded={this.props.hiddenLetters.length > 0}>
          <AccordionItemTitle>
            <h4 className="u-position-relative">
              Rows (letters, dates)
              <div className="accordion__arrow" role="presentation" />
            </h4>
          </AccordionItemTitle>
          <AccordionItemBody>
            <div className={"buttons are-small"}>
              {this.props.hiddenLetters.map(ltid => (
                <LetterButton
                  key={ltid}
                  letterID={ltid}
                  buttonClass="button is-outlined"
                  onHiddenChange={this.props.onHiddenChange}
                  letter={<SyriacLetter id={ltid} />}
                />
              ))}
            </div>
          </AccordionItemBody>
        </AccordionItem>
      </Accordion>
    );
  }
}

export default ChartAccordion;
