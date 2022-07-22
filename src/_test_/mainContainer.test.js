import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15'
import AppContainer from '../components/mainContainer';


describe('<AppContainer /> with no props', () => {
    const container = shallow(<AppContainer />);
    it('should match the snapshot', () => {
      expect(container.html()).toMatchSnapshot();
    });

})
