import React from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import moment from 'moment';
import style from './style';
import constants from './constants';

export default class CalendarDays extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDayIndex: 0,
      scrollPosition: 0,
    };
  }

  componentDidMount() {
    const { firstDate, selectedDate } = this.props;

    const first = firstDate ? moment(firstDate) : moment(new Date());
    const selected = selectedDate ? moment(selectedDate) : first;

    const selectedDayIndex = moment.duration(selected.diff(first)).asDays();

    this.setState({
      selectedDayIndex,
    });

    setTimeout(() => {
      this.setScrollOffset(selectedDayIndex);
    }, 100);
  }

  setScrollOffset = (index) => {
    const { showArrows } = this.props;
    if (this.scrollView) {
      const { width, daysInView } = this.props;

      let scrollViewWidth = constants.DAY_SIZE;
      if (width || daysInView) {
        scrollViewWidth = width || daysInView * constants.DAY_SIZE;
      }
      const xOffset = constants.DAY_SIZE * index
        + (constants.DAY_SIZE - scrollViewWidth) / 2
        + (scrollViewWidth % constants.DAY_SIZE) / 2;

      const scrollOffset = { x: xOffset, animated: true };

      this.scrollView.scrollTo(scrollOffset);
    }
  };

  scroll = (direction) => {
    if (this.scrollView) {
      const { scrollPosition } = this.state;
      let newPosition = 0;
      if (direction === 'left') {
        newPosition = Math.max(scrollPosition - constants.DAY_SIZE, 0);
      } else {
        newPosition = scrollPosition + constants.DAY_SIZE;
      }

      this.setState({
        scrollPosition: newPosition,
      });

      this.scrollView.scrollTo({ x: newPosition, animated: true });
    }
  };

  dateSelect = (props) => {
    const { onDateSelect } = this.props;
    this.setState(
      { selectedDayIndex: props.key },
      this.setScrollOffset(props.key),
    );

    if (typeof onDateSelect === 'function') {
      onDateSelect(props.date);
    }
  };

  generateDates = (props) => {
    const date = moment(props.firstDate);
    const disabledDates = props.disabledDates ? props.disabledDates : [];

    const first = props.firstDate
      ? moment(props.firstDate)
      : moment(new Date());
    const last = props.lastDate ? moment(props.lastDate) : null;

    const numberOfDays = last
      ? moment.duration(last.diff(first)).asDays() + 1
      : props.numberOfDays;

    const dates = [];
    for (let i = 0; i < numberOfDays; i += 1) {
      const isDisabled = !!disabledDates.includes(date.format('YYYY-MM-DD'));

      dates.push({
        date: date.format('YYYY-MM-DD'),
        day: date.format('D'),
        day_of_week: date.format('dddd'),
        month: date.format('MMMM'),
        disabled: isDisabled,
      });
      date.add(1, 'days');
    }
    return dates;
  };

  render() {
    let days;
    const { selectedDayIndex } = this.state;
    const {
      firstDate,
      lastDate,
      numberOfDays,
      disabledText,
      daysInView,
      disabledDates,
      width,
      paginate,
      showArrows,
      leftArrow,
      rightArrow,
    } = this.props;

    let scrollWidth = null;
    if (width) {
      scrollWidth = width;
    } else if (daysInView) {
      scrollWidth = daysInView * constants.DAY_SIZE;
    }

    const daysProps = {
      firstDate,
      lastDate,
      numberOfDays: numberOfDays || 30,
      disabledText: disabledText || null,
      disabledDates: disabledDates || null,
    };

    const availableDates = this.generateDates(daysProps);

    if (availableDates) {
      days = availableDates.map((val, key) => {
        const isClosedStyle = val.open ? null : style.closed;

        const isClosedMonthStyle = val.disabled
          ? style.monthContainerClosed
          : null;

        const selectedStyle = selectedDayIndex === key ? style.singleContainerSelected : null;

        return (
          <TouchableOpacity
            key={key}
            disabled={val.disabled}
            onPress={() => this.dateSelect({ key, date: availableDates[key].date })
            }
          >
            <View style={[style.singleContainer, Platform.OS !== 'web' ? selectedStyle : null]}>
              <View style={[style.singleDateBox, selectedStyle]}>
                <View style={[style.monthContainer, isClosedMonthStyle]}>
                  <Text style={style.monthText}>{val.month}</Text>
                </View>
                <View style={style.dateContainer}>
                  <Text style={[style.dateText, isClosedStyle]}>{val.day}</Text>
                </View>
                <View style={style.dayContainer}>
                  <Text style={[style.dayText, isClosedStyle]}>
                    {val.disabled && disabledText
                      ? daysProps.disabledText
                      : val.day_of_week}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      });
    }

    return (
      <View style={{ height: constants.DAY_SIZE, width: scrollWidth, flexDirection: 'row' }}>
        {showArrows ?
          <TouchableOpacity style={style.arrow} onPress={() => this.scroll('left')}>
            {leftArrow}
          </TouchableOpacity>
          : null}
        <ScrollView
          ref={(scrollView) => {
            this.scrollView = scrollView;
          }}
          scrollEnabled={!showArrows}
          horizontal
          snapToInterval={
            paginate && scrollWidth % constants.DAY_SIZE === 0
              ? scrollWidth
              : constants.DAY_SIZE
          }
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ width: (scrollWidth % constants.DAY_SIZE) / 2 }}/>
          {days || null}
        </ScrollView>
        {showArrows ?
          <TouchableOpacity style={style.arrow} onPress={() => this.scroll('right')}>
            {rightArrow}
          </TouchableOpacity>
          : null}
      </View>
    );
  }
}
