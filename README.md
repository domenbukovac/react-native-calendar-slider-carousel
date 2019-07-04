# React Native Calendar Slider Carousel 📆

The package is both **Android** and **iOS** compatible.

## Installation

```
$ npm install --save react-native-calendar-slider-carousel
```

The solution is implemented in JavaScript so no native module linking is required.

## Usage

`import CalendarDays from 'react-native-calendar-slider-carousel';`

All parameters for components are optional

### Calendar Demo

<kbd>
  <img src="https://github.com/domenbukovac/react-native-calendar-slider-carousel/blob/master/images/demo.gif?raw=true">
</kbd>

Used in combination with "react-native-collapsible"

#### Basic parameters

```javascript
<CalendarDays
  // First day. Default = new Date()
  firstDate={"2019-07-05"}
  // Last day. You can specify number of days instead
  lastDate={"2019-07-20"}
  // You can use numberOfDays instead of lastDate. Default = 30
  numberOfDays={60}
  // Initial selected day. Default = firstDate
  selectedDate={"2019-07-10"}
  // Text to display instead of week day in disables days
  disabledText={'closed'}
  // scrollView width
  width={240}
  // Instead of width you can specify number of days visible Each day box width = 120
  daysInView={3}
  // Only available if width % 120 = 0. Scroll by full width
  paginate
  // Array of disabled dates. Default [] 
  disabledDates={['2019-07-11', '2019-07-12', '2019-07-15']}
  // Function to get selected date in 'YYYY-MM-DD' format
  onDateSelect={date => this.changeSelectedDate(date)}
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