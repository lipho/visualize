import React, { Component } from 'react';
import PRESETS from '../constants-and-defaults/presets'
import Particle from './Particle'

export default class Visualize extends Component {
  constructor(props) {
    super(props);
    this.state = { timesDrawn: 0 };
    this.someStupidNumber = props.someStupidNumber;

    this.options = this.props.options || PRESETS[Math.round(Math.random() * (PRESETS.length - 1))]; // randomize preset selection

    //BINDINGS
    this._draw = this._draw.bind(this);
    this.adjustParticles = this.adjustParticles.bind(this);
    this.generateParticleMatrix = this.generateParticleMatrix.bind(this);
    this.positionParticles = this.positionParticles.bind(this);
    this.grabParentParticle = this.grabParentParticle.bind(this);
    this.generateConnectionMap = this.generateConnectionMap.bind(this);
    this.findX = this.findX.bind(this);
    this.findY = this.findY.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.particles = [];
    this.particleMatrix = [];
    this.connectionMap = [];
    //this.connectionColorMap = [];
    this.canvas = this._mainCanvas;
    this.ctx = this.canvas.getContext("2d");
    this.circleCenterX = this.canvas.width / 2;
    this.circleCenterY = this.canvas.height / 2;
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.fillStyle = "rgba(0, 0, 0, 1)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    for (let n = 0; n < this.options.layers.length; n++) {
      let r = this.options.layers[n];
      for (let i = 0; i < r.numPoints; i++) {
        let angle = Math.PI * 2 * (i / r.numPoints);
        let newParticle = new Particle(r, angle, n, i, this);
        this.particles.push(newParticle);
      }
    }
    this.generateParticleMatrix();
    this.positionParticles();
    this.generateConnectionMap();
    this._draw();
    requestAnimationFrame(this.tick)
  }

  grabParentParticle(parentLayerIdx, particleIdx) {
    let parentParticle = this.particleMatrix[parentLayerIdx][particleIdx];
    while (typeof parentParticle != 'object') {
      particleIdx -= this.options.layers[parentLayerIdx].numPoints;
      parentParticle = this.particleMatrix[parentLayerIdx][particleIdx];
    }
    return parentParticle;
  };

  tick() {
    console.log(this.particles);
    this._draw();
    if (this.particles.length < 100) {
      requestAnimationFrame(this.tick);
    }
  }


  adjustParticles() {
    let j = 0;
    for (let n = 0; n < this.options.layers.length; n++) {
      let r = this.options.layers[n];

      for (let i = 0; i < r.numPoints; i++) {
        let angle = this.particles[j].angle;
        this.particles[j] = new Particle(this.options.layers[n], angle, n, i, this);
        j++;
      }
    }
  }

  generateParticleMatrix() {
    let matrixStart = [];
    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];

      if (typeof matrixStart[p.layerIdx] === 'undefined') {
        matrixStart[p.layerIdx] = [];
      }

      matrixStart[p.layerIdx][p.particleInLayerIdx] = p;
    }

    this.particleMatrix = matrixStart;
  };

  positionParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      let x = this.findX(this.particles[i]);
      let y = this.findY(this.particles[i]);
      this.particles[i].location.x = x;
      this.particles[i].location.y = y;
    }
  }

  generateConnectionMap() {
    let total = this.particles.length;

    for (let i = 0; i < total; i++) {
      for (let n = i + 1; n < total; n++) {

        let newConnection = {
          x1: this.particles[i].location.x,
          y1: this.particles[i].location.y,
          x2: this.particles[n].location.x,
          y2: this.particles[n].location.y,
          rgba: 'rgba(255, 255, 255, 1)'
        };

        if (this.options.connectOnSameLayer && this.particles[i].layerIdx == this.particles[n].layerIdx) {
          let makeConnection = true;

          if (this.options.outlineOnly) {
            if (Math.abs(this.particles[i].particleInLayerIdx - this.particles[n].particleInLayerIdx) != 1) {
              makeConnection = this.particles[i].particleInLayerIdx == 0 && this.particles[n].particleInLayerIdx == (this.particles[n].Layer.numPoints - 1);
            }
          }

          if (makeConnection) {
            this.connectionMap.push(newConnection);
          }
        }

        if (this.options.connectOnDiffLayer && this.particles[i].layerIdx !== this.particles[n].layerIdx) {
          this.connectionMap.push(newConnection);
        }
      }

      if (this.options.connectToCenter) {
        this.connectionMap.push({
          x1: this.particles[i].location.x,
          y1: this.particles[i].location.y,
          x2: this.circleCenterX,
          y2: this.circleCenterY,
          rgba: 'rgba(255, 255, 255, 1)'
        });
      }
    }

  };

  findY(particle) {
    let angle = particle.angle;
    let radius = particle.radius;
    let center = particle.Layer.center;

    if (center.mutable) {
      if (typeof center.particleIdx != 'undefined') {
        let parentParticle = this.particles[center.particleIdx];
        center.y = parentParticle.location.y;
      }

      if (typeof center.layerIdx != 'undefined') {
        let currentParticleIdx = particle.particleInLayerIdx;
        let parentParticle = this.grabParentParticle(center.layerIdx, currentParticleIdx);
        center.y = parentParticle.location.y;
      }
    }
    return center.y + radius * Math.sin(angle);
  };

  findX(particle) {
    let angle = particle.angle;
    let radius = particle.radius;
    let center = particle.Layer.center;

    if (center.mutable) {
      if (typeof center.particleIdx != 'undefined') {
        let parentParticle = this.particles[center.particleIdx];
        center.x = parentParticle.location.x;
      }

      if (typeof center.layerIdx != 'undefined') {
        let currentParticleIdx = particle.particleInLayerIdx;
        let parentParticle = this.grabParentParticle(center.layerIdx, currentParticleIdx);
        center.x = parentParticle.location.x;
      }
    }

    return center.x + radius * Math.cos(angle);
  }

  _draw() {

    /*console.log(this.canvas);
    console.log(this.ctx);*/

    // fill the mask in over existing drawings
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "black";
    this.ctx.fill();

    this.ctx.globalCompositeOperation = "lighter";

    for (let j = 0; j < this.connectionMap.length; j++) {
      let connection = this.connectionMap[j];

      this.ctx.beginPath();
      this.ctx.lineWidth = 1;

      if (this.options.connectionStyle == 'linear') {
        this.ctx.moveTo(connection.x1, connection.y1);
        this.ctx.lineTo(connection.x2, connection.y2);
      } else if (this.options.connectionStyle == 'quadratic') {
        if (this.options.quadraticStyle == 'rose') {
          this.ctx.moveTo(connection.x1, connection.y1);
          this.ctx.quadraticCurveTo(connection.x2, connection.y2, this.circleCenterX, this.circleCenterY);
        } else if (this.options.quadraticStyle == 'daisy') {
          this.ctx.moveTo(this.circleCenterX, this.circleCenterY);
          this.ctx.quadraticCurveTo(connection.x1, connection.y1, connection.x2, connection.y2);
        }
      }

      this.ctx.strokeStyle = connection.rgba;
      this.ctx.stroke();
    }

    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(p.location.x - (p.size / 2), p.location.y - (p.size / 2), p.size, p.size);

      // move the particles around our circle
      if (p.direction == 'cw') {
        p.angle += p.speed * Math.PI / 180;
      } else if (p.direction == 'ccw') {
        p.angle -= p.speed * Math.PI / 180;
      } else if (p.direction == 'erratic') {
        let rand = Math.random();
        if (rand > .5) {
          p.angle += p.speed * Math.PI / 180;
        } else {
          p.angle -= p.speed * Math.PI / 180;
        }
      }

      this.particles[i].angle = p.angle;
      this.particles[i].location.x = this.findX(p);
      this.particles[i].location.y = this.findY(p);
    }

    this.generateConnectionMap(this.particles);
  };

  render() {
    return (
      <section>
        <canvas id="canvas" width={this.props.width || window.innerWidth}
                height={this.props.height || window.innerHeight}
                ref={ref => this._mainCanvas = ref} />
      </section>
    );
  }
};

