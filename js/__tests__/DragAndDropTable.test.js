import React from 'react';
import { shallow } from 'enzyme';

import DragAndDropTable from '../components/DragAndDropTable';

describe('DragAndDropTable', () => {
  it('should render shallowly', () => {
    const component = shallow(<DragAndDropTable />);
    expect(component).toMatchSnapshot();
  });
});