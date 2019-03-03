import React from "react";
//import ReactDOM from 'react-dom';

import LetterButton from "./LetterButton";

import SyriacLetter from "./SyriacLetter";

import { manuscripts } from "./ScriptChart";

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
    this.onManuscriptClicked = this.onManuscriptClicked.bind(this);
  }
  onManuscriptClicked(id) {
    if (this.props.hasOwnProperty("onHiddenChange")) {
      console.log("manuscript clicked event: " + Object.keys(id));
      //this.props.onHiddenChange("show", "column", this.props.letterID);
    }
  }

  render() {
    console.log("Accordion rendering, hiddenManuscripts prop is " + this.props.hiddenManuscripts);
    console.log("Accordion rendering, hiddenLetters prop is " + this.props.hiddenLetters);

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
                  <h4 className="u-position-relative">Columns (manuscripts)
                    <div className="accordion__arrow" role="presentation"/>
                  </h4>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <ul>
                    { this.props.hiddenManuscripts.map(msid => {
                        let msIndex = manuscripts.findIndex(m => m['id'] == msid);
                        let shelfmark = manuscripts[msIndex]['shelfmark'];
                        return <li key={msIndex} msid={msIndex} onClick={this.onManuscriptClicked} style={{ cursor: 'pointer' }}>{shelfmark}</li>
                    }, this) }
                  </ul>
                </AccordionItemBody>
              </AccordionItem>
              <AccordionItem>
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
          </AccordionItemBody>
        </AccordionItem>
      </Accordion>
    );
  }
}

export default ChartAccordion;
