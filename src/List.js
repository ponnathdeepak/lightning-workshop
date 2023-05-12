import { List } from "@lightningjs/ui";
import { Lightning, Utils } from "@lightningjs/sdk";
import data from "./../static/api/CONTENTLISTINGPAGE-PAGE1.json";
import Api from "./Api";
import Component from "./Component";
export default class ListComponent extends Lightning.Component {
  static _template() {
    return {
      HightlightedTitle: {
        x: 90,
        y: 200,
        text: {
          text: "",
          fontFace: "Regular",
          fontSize: 40,
          textColor: 0xffffffff,
          fontStyle: "bold",
        },
      },
      HightlightedDescription: {
        x: 90,
        y: 300,
        text: {
          text: "",
          fontFace: "Regular",
          fontSize: 40,
          textColor: 0xbb747474,
          wordWrapWidth: 900,
          maxLines: 2,
        },
      },
      Category: {
        x: 90,
        y: 500,
        text: {
          text: "",
          fontFace: "Regular",
          fontSize: 40,
          textColor: 0xffffffff,
          fontStyle: "bold",
        },
      },
      List: {
        x: 90,
        y: 600,
        w: 1650,
        h: 200,
        type: List,
        spacing: 18,
        forceLoad: true,
      },
    };
  }
  // async _getMovies(){
  //     return fetch("./../static/api/CONTENTLISTINGPAGE-PAGE1.json").then((response)=>{
  //         return response.json();
  //     })
  // }
  _init() {
    this.pageFetched = 0;
    this.totalCount = 0;

    Api._getMovies().then((movieList) => {
      this.tag("Category").text = movieList.page.title;
      console.log(movieList);
      this.totalCount = Number(movieList["page"]["total-content-items"]);
      this.pageFetched = 1;
      this.tag("List").items = movieList["page"]["content-items"][
        "content"
      ].map((item) => {
        return {
          ref: "Movie",
          w: 230,
          h: 345,
          type: Component,
          item: item,
        };
      });
    });
  }
  $focusedTile(item) {
    console.log(item);
    this.tag("HightlightedTitle").text = item.name;
    this.tag("HightlightedDescription").text = item.description;
    if (
      this.tag("List").index === this.tag("List").length - 1 &&
      this.tag("List").length < this.totalCount
    ) {
      this.fetchNext();
    }
  }
  fetchNext() {
    Api._getMovies(this.pageFetched + 1).then((movieList) => {
      this.tag("Category").text = movieList.page.title;
      console.log(movieList);
      this.totalCount = Number(movieList["page"]["total-content-items"]);
      this.pageFetched += 1;
      this.tag("List").add(
        movieList["page"]["content-items"]["content"].map((item) => {
          return {
            ref: "Movie",
            w: 230,
            h: 345,
            type: Component,
            item: item,
          };
        })
      );
    });
  }

  _getFocused() {
    return this.tag("List");
  }
}
