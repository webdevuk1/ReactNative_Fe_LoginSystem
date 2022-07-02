import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Agenda } from "react-native-calendars";
import { addDays, format } from "date-fns";

const Schedule = () => {
  const [items, setItems] = useState({
    // "2022-06-26": [{ name: "test 1", cookies: true }],
    // "2022-06-27": [{ name: "test 1", cookies: false }],
  });

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();

      const slicedData = data.slice(0, 5);

      const mappedData = slicedData.map((post, index) => {
        // add 1 day increments with index
        const date = addDays(new Date(), index);
        return {
          ...post,
          date: format(date, "yyyy-MM-dd"),
        };
      });

      // Using a reduce to restructure the useState items object to allow date to be the key object of nested objects (key/value) "2022-06-26": [{ name: "test 1", cookies: true }] This is so we can query and display the right data onto the ui depending on the day.
      // Acc = Accumlator this grabs the seconded object in reduce function and were return restructure object into it.
      const reduced = mappedData.reduce((acc, currentItem) => {
        const { date, ...itemKey } = currentItem;

        acc[date] = [itemKey];

        return acc;
      }, {});

      // Slice data to 5 posts
      setItems(reduced);
    };

    getData();
  }, []);

  const renderItem = (item) => {
    return (
      <View style={styles.itemContainer}>
        <View style={{ padding: 10 }}>
          <Text>{item.body}</Text>
          <Text>{item.cookies ? `🍪` : `😋`}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Agenda
        items={items}
        renderItem={renderItem}
        showClosingKnob={true}
        pastScrollRange={4}
        futureScrollRange={20}
        // Specify how agenda knob should look
        // renderKnob={() => {
        // return <View />;

        theme={
          {
            // Check itemContainer styles to edit {item.body} ect.
            // agenda controls the main display stlyes NOT the calendar
            // agendaDayTextColor: "pink",
            // agendaDayNumColor: "black",
            // agendaTodayColor: "red",
            // agendaKnobColor: "blue",
            // dotColor: "black",
            // backgroundColor: "red",
            // calendarBackground: "black",
            // textSectionTitleColor days of week
            // textSectionTitleColor: "pink",
            // textSectionTitleDisabledColor: "red",
            // selectedDayBackgroundColor: "blue",
            // selectedDayTextColor: "black",
            // todayTextColor: "white",
            // dayTextColor: "green",
            // textDisabledColor: '#d9e1e8',
            // selectedDotColor: '#ffffff',
            // monthTextColor: "blue",
          }
        }
        // calendarStyle={{
        //    backgroundColor: "red",
        // }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: "white",
    marginTop: 35,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default Schedule;
