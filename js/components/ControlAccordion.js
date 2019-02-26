import React from "react";
//import ReactDOM from 'react-dom';

const AccordionStyle = {
  border: '2px dotted green'
};

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import "../../node_modules/react-accessible-accordion/dist/fancy-example.css";

class ControlAccordion extends React.Component {
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
                  <h4 className="u-position-relative">Hidden manuscripts
                    <div className="accordion__arrow" role="presentation"/>
                  </h4>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <ul>
                    <li>Manuscript 1</li>
                    <li>Manuscript 2</li>
                  </ul>
                </AccordionItemBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemTitle>
                  <h4 className="u-position-relative">Hidden letters
                    <div className="accordion__arrow" role="presentation" />
                  </h4>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <p>Letter 1</p>
                  <p>Letter 2</p>
                </AccordionItemBody>
              </AccordionItem>
            </Accordion>
          </AccordionItemBody>
        </AccordionItem>
      </Accordion>
    );
  }
}

export default ControlAccordion;
