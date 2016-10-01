import React, { Component } from 'react';

class Menu extends Component {

  render() {
    return (
      /*original menu*/
      <div id="menu">
        <form id="menu-form">
          <h4 className="collapser">
            General
            <span className="right ui-icon ui-icon-arrowthick-1-n"/>
          </h4>

          <hr/>
          <br/>

          <div className="collapsible">

            <div className="form-field">
              <label>Fade Out Speed</label>
              <div id="fadeOut" className="slider"></div>
              <div className="clear"></div>
            </div>

            <div className="form-field">
              <label>Point Size</label>
              <div id="pointSize" className="slider"></div>
              <div className="clear"></div>
            </div>

            <br/>
            <hr/>
            <br/>

            <div className="form-field">
              <label>Connect Points on Same Layer</label>
              <select id="connectOnSameLayer">
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
              <div className="clear"></div>
            </div>

            <div className="form-field">
              <label>Connect Differently Layered Points</label>
              <select id="connectOnDiffLayer">
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
              <div className="clear"></div>
            </div>

            <div className="form-field">
              <label>Connect to Center</label>
              <select id="connectToCenter">
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
              <div className="clear"></div>
            </div>

            <br/>
            <hr/>
            <br/>

            <div className="form-field">
              <label>
                <a id="regenerateColorScheme" href="#" title="Click to regenerate color scheme">
                  Generate Color Scheme
                </a>
              </label>
              <select id="generateLineColors">
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
              <div className="clear"></div>
            </div>

            <div className="form-field">
              <label>Num Colors to Generate</label>
              <div className="slider" id="numColorsGenerate"></div>
              <div className="clear"></div>
            </div>

            <div style="text-align: center; padding-bottom: 10px">
              ------- OR -------
            </div>

            <div className="form-field">
              <label>Random Colors</label>
              <select id="randomColors">
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
              <div className="clear"></div>
            </div>

            <div className="form-field">
              <label>Cycle Colors</label>
              <select id="colorChangeOnDraw">
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
              <div className="clear"></div>
            </div>

            <br/>
            <hr/>
            <br/>

            <div className="form-field">
              <label>Line Style</label>
              <select id="connectionStyle">
                <option value="linear">Linear</option>
                <option value="quadratic">Quadratic</option>
              </select>
              <div className="clear"></div>
            </div>

            <div className="form-field">
              <label>Pattern Style (quadratic)</label>
              <select id="quadraticStyle">
                <option value="daisy">"Daisy"</option>
                <option value="rose">"Rose"</option>
              </select>
              <div className="clear"></div>
            </div>

            <br/>
            <hr/>
          </div>

          <h4 className="collapser">
            Layers
            <span className="right ui-icon ui-icon-arrowthick-1-n"/>
          </h4>
          <hr/>
          <br/>

          <div id="layerBox" className="collapsible"></div>
        </form>
      </div>
    );
  }
}

export default Menu;