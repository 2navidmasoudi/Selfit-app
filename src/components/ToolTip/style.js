// @flow
import { StyleSheet } from 'react-native';
import { darkColor, mainColor, white } from '../../assets/variables/colors';
import { mainFont } from '../../assets/variables/font';

export const STEP_NUMBER_RADIUS: number = 14;
export const STEP_NUMBER_DIAMETER: number = STEP_NUMBER_RADIUS * 2;
export const ZINDEX: number = 100;
export const MARGIN: number = 13;
export const OFFSET_WIDTH: number = 4;
export const ARROW_SIZE: number = 6;

export default StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: ZINDEX,
  },
  arrow: {
    position: 'absolute',
    borderColor: 'transparent',
    borderWidth: ARROW_SIZE,
  },
  tooltip: {
    position: 'absolute',
    paddingTop: 0,
    paddingHorizontal: 0,
    backgroundColor: white,
    borderRadius: 10,
    overflow: 'hidden',
  },
  tooltipText: {
    fontFamily: mainFont,
  },
  tooltipContainer: {
    flex: 1,
  },
  stepNumberContainer: {
    position: 'absolute',
    width: STEP_NUMBER_DIAMETER,
    height: STEP_NUMBER_DIAMETER,
    overflow: 'hidden',
    zIndex: ZINDEX + 1,
  },
  stepNumber: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: STEP_NUMBER_RADIUS,
    borderColor: white,
    backgroundColor: mainColor,
  },
  stepNumberText: {
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: white,
  },
  button: {
    padding: 10,
  },
  buttonText: {
    color: mainColor,
    fontFamily: mainFont,
  },
  bottomBar: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  overlayRectangle: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  overlayContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
});
