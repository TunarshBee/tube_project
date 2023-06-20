import React, { Component } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import VideoList from "./components/VideoList";
import Youtube from "./apis/Youtube";
import VideoDetail from "./components/VideoDetail";

export class App extends Component {
  state = { videos: [], selectedVideo: null };

  componentDidMount() {
    this.onTermSubmit("buildings");
  }

  onTermSubmit = async (term) => {
    const resp = await Youtube.get("/search", {
      params: {
        q: term,
      },
    });
    this.setState({
      videos: resp.data.items,
      selectedVideo: resp.data.items[0],
    });
  };

  onVideoSelect = (videos) => {
    this.setState({ selectedVideo: videos });
  };

  render() {
    return (
      <div className=" ui container">
        <SearchBar onTermSubmit={this.onTermSubmit} />
        <div className="">
          <div className="">
            <div className="">
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className="">
              <VideoList
                onVideoSelect={this.onVideoSelect}
                videos={this.state.videos}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
