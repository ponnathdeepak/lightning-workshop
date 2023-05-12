import { Lightning, Utils } from "@lightningjs/sdk";
import List from "./List";

export default class App extends Lightning.Component {
  static getFonts() {
    return [
      { family: "Regular", url: Utils.asset("fonts/Roboto-Regular.ttf") },
    ];
  }

  static _template() {
    return {
      Title: {
        mountX: 0.5,
        x: 960,
        y: 100,
        text: {
          text: "LIGHTNING WORKSHOP",
          fontFace: "Regular",
          fontSize: 40,
          textColor: 0xbb747474,
        },
      },
      Clock: {
        mountX: 1,
        x: 1900,
        y: 100,
        text: {
          text: "08:59",
          fontFace: "Regular",
          fontSize: 64,
          textColor: 0xbb747474,
        },
      },
      List: {
        type: List,
      },
    };
  }

  _init() {
    setInterval(() => {
      let date = new Date();
      let hh = date.getHours();
      let mm = date.getMinutes();

      hh = hh < 10 ? "0" + hh : hh;
      mm = mm < 10 ? "0" + mm : mm;

      let time = hh + ":" + mm;
      this.tag("Clock").text = time;
    }, 1000);
  }
  _getFocused() {
    return this.tag("List");
  }
}
