export const GENERAL_NON_DESTRUCTIVE_OPTIONS = [
  'fadeOut',
  'pointSize',
  'connectionStyle',
  'quadraticStyle'
];

export const LAYER_NON_DESTRUCTIVE_OPTIONS = [
  'radius',
  'direction',
  'pointSpeed',
  'center.layerIdx'
];

export const BOOL_FIELDS = [
  'connectOnSameLayer',
  'connectOnDiffLayer',
  'connectToCenter',
  'randomColors',
  'colorChangeOnDraw',
  'generateLineColors'
];

export const VALUE_FIELDS = [
  'connectionStyle',
  'quadraticStyle'
];

export const SLIDER_FIELDS = {
  'pointSize': {
    min: 0,
    max: 1,
    step: 0.1
  },
  'fadeOut': {
    min: 0.1,
    max: 1,
    step: 0.1
  },
  'lineDistanceFactor': {
    min: 1,
    max: 5,
    step: 1
  },
  'numColorsGenerate': {
    min: 1,
    max: 24,
    step: 1
  },
  'radius': {
    min: 50,
    max: 800,
    step: 50
  },
  'numPoints': {
    min: 1,
    max: 24,
    step: 1
  },
  'pointSpeed': {
    min: 1,
    max: 9,
    step: 1
  }
};

export default {
  GENERAL_NON_DESTRUCTIVE_OPTIONS,
  LAYER_NON_DESTRUCTIVE_OPTIONS,
  BOOL_FIELDS,
  VALUE_FIELDS,
  SLIDER_FIELDS,
};