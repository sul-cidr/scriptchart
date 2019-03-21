/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import LetterImage from '../LetterImage';


describe('LetterImage test', () => {
  it('LetterImage should match snapshot', () => {
    const coords = 
    {
        "id": 1,
        "page": {
            "id": 1,
            "manuscript": 1,
            "url": "https://images.syriac.reclaim.hosting/manuscripts/VatSyr110/VatSyr110-002.png",
            "height": 1584,
            "width": 1044
        },
        "letter": 37,
        "top": 406,
        "left": 567,
        "width": 22,
        "height": 40,
        "binary_url": "https://images.syriac.reclaim.hosting/binary/Vat. Syr. 110_1R_Sadhe_567_406_22_40.png"
    };
    const component = renderer.create(<LetterImage coords={coords}
       />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
