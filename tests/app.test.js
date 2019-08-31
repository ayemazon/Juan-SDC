import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../client/src/App';
import AllProductsLinkGenerator, {
  Link,
} from '../client/src/AllProductsLinkGenerator';

describe('renders homepage', () => {
  it('renders at least 4 items from database', () => {
    const AppComponent = shallow(<App />);
    const allDummyProducts = [
      { title: 'test product 1', id: '1' },
      { title: 'test product 2', id: '2' },
      { title: 'test product 3', id: '3' },
      { title: 'test product 4', id: '4' },
    ];
    const AllProductsLinkGeneratorComponent = mount(
      <AllProductsLinkGenerator allProducts={allDummyProducts} />
    );
    console.log(AllProductsLinkGeneratorComponent.debug());
    expect(AppComponent).toBeDefined();
    // expect(AllProductsLinkGeneratorComponent.find(<Link />)).toHaveLength(4);
    expect(AllProductsLinkGeneratorComponent.find('.bPeFxW')).toHaveLength(4);
  });
});
