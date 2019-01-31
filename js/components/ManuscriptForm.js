import React from "react";

// In this component, we would actually pass a list of
// manuscripts, and have a toggle to sort by date or name
// The list could come from a json object with name and date
const ManuscriptForm = () => {
  return (
    <form className={"manuscript-form"}>
      <div className={"field"}>
        <label className={"control"}>Select Manuscripts:</label>
        <div className={"control"}>
          <div className={"select is-multiple"}>
            <select multiple>
              <option>Manuscript A</option>
              <option>Manuscript B</option>
              <option>Manuscript C</option>
              <option>Manuscript D</option>
              <option>Manuscript E</option>
              <option>Manuscript F</option>
            </select>
          </div>
        </div>
        <div className={"control sort-option"}>
          <p>Order manuscripts by:</p>
          <label className={"radio"}>
            Shelfmark:
            <input type={"radio"} name={"Shelfmark"} defaultChecked />
          </label>
          <label className={"radio"}>
            Date:
            <input type={"radio"} name={"Date"} />
          </label>
        </div>
      </div>
      <div className={"field"}>
        <label className={"control"}>Select Letters:</label>
        <div className={"control"}>
          <div className={"select is-multiple"}>
            <select multiple>
              <option>ʾĀlep̄</option>
              <option>Bēṯ</option>
              <option>Gāmal</option>
              <option>Dālaṯ</option>
              <option>Hē</option>
              <option>Waw</option>
            </select>
          </div>
        </div>
      </div>
      <div className={"field"}>
        <label className={"control"}>Select number of letter examples:</label>
        <div className={"control"}>
          <div className={"select"}>
            <select>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
        </div>
      </div>
      <div className={"field"}>
        <label className={"checkbox"}>
          Show binarized images?
          <input type={"checkbox"} />
        </label>
      </div>
      <div className={"field"}>
        <label className={"control"}>Select image size:</label>
        <div className={"control"}>
          <div className={"select"}>
            <select>
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>
        </div>
      </div>
      <div className={"field"}>
        <div className={"control"}>
          <button className={"button is-link"}>Submit</button>
        </div>
      </div>
    </form>
  );
};

export default ManuscriptForm;
