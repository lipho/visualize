import React, { Component } from 'react';

export default class Overlay extends Component {

  render() {
    return (
      <div id="overlay">
        <div className="panel"/>
        <div className="content">
          <h1>visualize.</h1>
          <br/><br/>
          <em>
            the brain child of Alexa Herrera
          </em>

          <div className="cta">
            <button>Come and Play</button>
          </div>

          <div id="github">
            <a href="https://github.com/anherrera/visualize">
              <img src="images/GitHub-Mark-32px.png"/>
            </a>
            <em>
              <small>fork me</small>
            </em>
          </div>

          <br/><br/>

          <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"/>
          <input type="hidden" name="cmd" value="_donations/"/>
          <input type="hidden" name="business" value="alexa.herrera90@gmail.com"/>
          <input type="hidden" name="lc" value="US"/>
          <input type="hidden" name="item_name" value="Alexa Herrera"/>
          <input type="hidden" name="no_note" value="0"/>
          <input type="hidden" name="currency_code" value="USD"/>
          <input type="hidden" name="bn"
                 value="PP-DonationsBF:btn_donate_SM.gif:NonHostedGuest/"/>
          <input type="image"
                 src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"
                 border="0" name="submit"
                 alt="PayPal - The safer, easier way to pay online!"/>
          <img alt="" border="0"
               src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1"
               height="1"/>
          <em>
            <small>or buy me a coffee!</small>
          </em>
        </div>
        <div className="panel"></div>
      </div>
    );
  }
};

