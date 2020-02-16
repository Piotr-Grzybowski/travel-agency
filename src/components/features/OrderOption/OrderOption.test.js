import React from 'react';
import { shallow } from 'enzyme';
import OrderOption from './OrderOption';

// Tests of component OrderOption
describe('Component OrderOption', () => {
  it('should render correctly', () => {
    expect(() => shallow(<OrderOption name="abc" type="dropbox" />)).toBeTruthy();
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  it('should render correct name', () => {
    const expectedName = 'abc';
    const component = shallow(<OrderOption name={expectedName} type="icons"/>);

    expect(component.find('.title').text()).toEqual(expectedName);
  });
});

// Tests of subcomponents of OrderOption
const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

// Mocks
const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;
const testValueDate = new Date('2020-02-21T12:00:00.000Z');

// Tests
for(let type in optionTypes){
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubComponent;
    let mockSetOrderOption;

    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubComponent = subcomponent.dive();
    });

    /* common tests */
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */
        it('contains select and options', () => {
          const select = renderedSubComponent.find('select');
          expect(select.length).toBe(1);

          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);

          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubComponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toHaveBeenCalledTimes(1);
          expect(mockSetOrderOption).toHaveBeenCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'icons': {
        // tests for icons
        it('contains divs with icon class and one active icon', () => {
          const emptyIcon = renderedSubComponent.find('Icon[name="times-circle"]');
          expect(emptyIcon.length).toBe(1);

          const divsIcon = renderedSubComponent.find('Icon').not('Icon[name="times-circle"]');
          expect(divsIcon.length).toBe(mockProps.values.length);

          const activeIcon = renderedSubComponent.find('.iconActive');
          expect(activeIcon.length).toBe(1);
        });
        it('should run setOrderOption function on click', () => {
          renderedSubComponent.find('.icon:last-child').simulate('click');
          expect(mockSetOrderOption).toHaveBeenCalledTimes(1);
          expect(mockSetOrderOption).toHaveBeenCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'checkboxes': {
        // tests for checkboxes
        it('contains inputs', () => {
          const inputs = renderedSubComponent.find('input[type="checkbox"]');
          expect(inputs.length).toBe(mockProps.values.length);
        });
        it('should run setOrderOption on change', () => {
          renderedSubComponent.find('input[value="' + testValue + '"]').simulate('change', {currentTarget: {checked: true}});
          expect(mockSetOrderOption).toHaveBeenCalledTimes(1);
          expect(mockSetOrderOption).toHaveBeenCalledWith({ [mockProps.id]: [mockProps.currentValue, testValue] });
        });
        break;
      }
      case 'number': {
        // tests for number options
        it('contains input type number', () => {
          const numberInput = renderedSubComponent.find('input[type="number"]');
          expect(numberInput.length).toBe(1);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubComponent.find('input').simulate('change', {currentTarget: {value: testValueNumber}});
          expect(mockSetOrderOption).toHaveBeenCalledTimes(1);
          expect(mockSetOrderOption).toHaveBeenCalledWith({ [mockProps.id]: testValueNumber });
        });
        break;
      }
      case 'text': {
        // tests for text options
        it('contains input type text', () => {
          const textInput = renderedSubComponent.find('input[type="text"]');
          expect(textInput.length).toBe(1);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubComponent.find('input').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toHaveBeenCalledTimes(1);
          expect(mockSetOrderOption).toHaveBeenCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'date': {
        // tests for date picker
        it('renders date picker', () => {
          // console.log(renderedSubComponent.debug());
          // No idea why but date picker renders as <t />
          const datePicker = renderedSubComponent.find('t');
          expect(datePicker.length).toBe(1);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubComponent.find('t').simulate('change', testValueDate);
          expect(mockSetOrderOption).toHaveBeenCalledTimes(1);
          expect(mockSetOrderOption).toHaveBeenCalledWith({[mockProps.id]: testValueDate});
        });
        break;
      }
    }
  });
}
