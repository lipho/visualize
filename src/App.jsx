import React, { Component } from 'react';

import Visualize from '../components/Visualize';
import PRESETS from '../constants-and-defaults/presets'

function generatePresets() {
 return PRESETS[Math.round(Math.random() * (PRESETS.length - 1))] ;
}

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {timesDrawn: 0};
  }

  render() {
    return (
      <section>
        <Visualize
          blahNumbar={this.state.timesDrawn}
          options={generatePresets()}
        />
      </section>
    );
  }
}
