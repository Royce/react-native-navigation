const { View } = require("react-native");
const React = require("react");
const Root = require("../components/Root");
const Button = require("../components/Button");
const Navigation = require("../services/Navigation");
const {
  OPEN_LEFT_SIDE_MENU_BTN,
  OPEN_RIGHT_SIDE_MENU_BTN,
  CENTER_SCREEN_HEADER
} = require("../testIDs");
const Screens = require("./Screens");

class SideMenuCenterScreen extends React.Component {
  static options() {
    return {
      topBar: {
        testID: CENTER_SCREEN_HEADER,
        title: {
          text: "Center"
        },
        leftButtons: {
          id: "sideMenu",
          icon: require("../../img/menu.png")
        }
      }
    };
  }

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === "sideMenu") this.open("left");
  }

  render() {
    return (
      <Root componentId={this.props.componentId}>
        <Button
          label="Open Left"
          testID={OPEN_LEFT_SIDE_MENU_BTN}
          onPress={() => this.open("left")}
        />
        <Button
          label="Open Right"
          testID={OPEN_RIGHT_SIDE_MENU_BTN}
          onPress={() => this.open("right")}
        />
        <View style={{ height: 20 }} />
        <Button
          label="Disable both"
          onPress={() => this.enable(false, false)}
        />
        <Button
          label="Enable left only"
          onPress={() => this.enable(true, false)}
        />
        <Button
          label="Enable right only"
          onPress={() => this.enable(false, true)}
        />
        <Button label="Enable both" onPress={() => this.enable(true, true)} />
      </Root>
    );
  }

  open = side =>
    Navigation.mergeOptions("RootLayoutId", {
      sideMenu: {
        [side]: { visible: true }
      }
    });

  enable = (left, right) =>
    Navigation.mergeOptions("RootLayoutId", {
      sideMenu: {
        right: { enabled: right },
        left: { enabled: left }
      }
    });
}

module.exports = SideMenuCenterScreen;
