# React Native Calendar Slider Carousel 📆
[![npm version](https://badge.fury.io/js/react-native-calendar-slider-carousel.svg)](https://badge.fury.io/js/react-native-calendar-slider-carousel)

The package is both **Android** and **iOS** compatible. It also works well with react native web.

## Installation

```
$ npm install --save react-native-calendar-slider-carousel
```

The solution is implemented in JavaScript so no native module linking is required.

## Demo

### Calendar demo on iOS and Android

<kbd>
  <img src="https://github.com/domenbukovac/react-native-calendar-slider-carousel/blob/master/images/demo.gif?raw=true">
</kbd>
<p></p>

Used in combination with "react-native-collapsible"

### Preview on web with scroll arrows

<kbd>
  <img src="https://github.com/domenbukovac/react-native-calendar-slider-carousel/blob/master/images/web_with_arrows.png?raw=true">
</kbd>


## Usage

`import CalendarDays from 'react-native-calendar-slider-carousel';`

All parameters for components are optional



#### Basic parameters

```javascript
<CalendarDays
  // First day. Default = new Date()
  firstDate={"2019-07-05"}
  // Last day. You can set number of days instead
  lastDate={"2019-07-20"}
  // Sets number of days displaued. Default = 30
  numberOfDays={60}
  // Initial selected day. Default = firstDate
  selectedDate={"2019-07-10"}
  // Optional text that replaces week day in disabled days
  disabledText={'closed'}
  // scrollView width
  width={240}
  // Instead of width you can set number of days visible.
  daysInView={3}
  // Only available if width % 120 = 0. Scroll by full width
  paginate={true}
  // Array of disabled dates. Default [] 
  disabledDates={['2019-07-11', '2019-07-12', '2019-07-15']}
  // Function to get selected date in 'YYYY-MM-DD' format
  onDateSelect={date => this.changeSelectedDate(date)}
  // Replaces scroll with left and right arrows.
  // Suitable for web where horizontal scroll is not always available 
  arrows={false}
  // Arrow icon components. Required if arrows={true}
  leftArrow={<Icon name="arrow-back" size={26} color="#555" />}
  rightArrow={<Icon name="arrow-forward" size={26} color="#555" />}
/>

```

```javascript
changeSelectedDate = date => {
  console.log(date); // "2019-07-20"
  
  this.setState({
    selectedDate: date,
   });
};

```
