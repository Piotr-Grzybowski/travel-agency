import React from 'react';
import { shallow } from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should generate link to correct address', () => {
    const expectedId = 'abc';
    const expectedLink = '/trip/abc';
    const component = shallow(<TripSummary id={expectedId} tags={[]} />);

    expect(component.find('Link').prop('to')).toEqual(expectedLink);
  });

  it('should render img with correct src and alt attributes', () => {
    const expectedImage = 'image.jpg';
    const expectedAltAttribute = 'image';
    const component = shallow(<TripSummary image={expectedImage} name={expectedAltAttribute} tags={[]}/>);

    expect(component.find('img').prop('src')).toEqual(expectedImage);
    expect(component.find('img').prop('alt')).toEqual(expectedAltAttribute);
  });

  it('should render correct name, cost and days', () => {
    const expectedName = 'abc';
    const expectedCost = '123';
    const expectedDays = 10;
    const component = shallow(<TripSummary name={expectedName} cost={expectedCost} days={expectedDays} tags={[]} />);

    const renderedName = component.find('.title').text();
    expect(renderedName).toEqual(expectedName);
    const renderedCost = component.find('.details span:last-child').text();
    expect(renderedCost).toEqual('from ' + expectedCost);
    const renderedDays = component.find('.details span:first-child').text();
    expect(renderedDays).toEqual(expectedDays + ' days');
  });

  it('should render without id, name, image, cost or days props', () => {
    expect(() => shallow(<TripSummary tags={[]} />)).toBeTruthy();
  });

  it('Should render tags correctly', () => {
    const expectedTags = ['a', 'b', 'c'];
    const component = shallow(<TripSummary tags={expectedTags} />);

    const renderedTags = component.find('.tag');
    for (let i = 0; i < 3; i++) {
      expect(renderedTags.at(i).text()).toEqual(expectedTags[i]);
    }
  });

  it('shouldn\'t render tags element if tags is an empty array', () => {
    const component = shallow(<TripSummary />);
    expect(component.find('.tags')).toEqual({});
  });


});
