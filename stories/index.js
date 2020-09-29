import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import "index.scss";

import DayListItem from "../src/components/DayListItem.js";
import Button from "../src/components/Button";



storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));



  storiesOf("DayListItem", module) //Initiates Storybook and registers our DayListItem component
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  }) // Provides the default background color for our component
  .add("Unselected", () => <DayListItem  name="Monday" spots={5} />) // To define our stories, we call add() once for each of our test states to generate a story
  .add("Selected", () => <DayListItem selected name="Monday" spots={5} />) 
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" onClick={action("button-clicked")} setDay={action("setDay")} spots={0} /> // action() allows us to create a callback that appears in the actions panel when clicked
  ));
