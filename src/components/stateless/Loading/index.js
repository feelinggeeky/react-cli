import React from "react";
import { Spin } from "antd";

class Loading extends React.Component {
  state = { loading: false };

  toggle = (value) => {
    this.setState({ loading: value });
  };

  render() {
    return (
      <div>
        <Spin spinning={this.state.loading} delay={500}>
        </Spin>
      </div>
    );
  }
}

export default Loading;
