import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { walkthroughable } from '@okgrow/react-native-copilot';
import styles from './style';
import Button from './Button';
import { persianNumber } from '../../utils/persian';

export const HelpView = walkthroughable(View);
export const Tooltip = ({
  isFirstStep,
  isLastStep,
  handleNext,
  handlePrev,
  handleStop,
  currentStep,
}) => (
  <View>
    <View style={styles.tooltipContainer}>
      <Text testID="stepDescription" style={styles.tooltipText}>{currentStep.text}</Text>
    </View>
    <View style={[styles.bottomBar]}>
      {
        !isLastStep ?
          <TouchableOpacity onPress={handleStop}>
            <Button>انصراف</Button>
          </TouchableOpacity>
          : null
      }
      {
        !isFirstStep ?
          <TouchableOpacity onPress={handlePrev}>
            <Button>قبل</Button>
          </TouchableOpacity>
          : null
      }
      {
        !isLastStep ?
          <TouchableOpacity onPress={handleNext}>
            <Button>بعد</Button>
          </TouchableOpacity> :
          <TouchableOpacity onPress={handleStop}>
            <Button>اتمام</Button>
          </TouchableOpacity>
      }
    </View>
  </View>
);
export const TipNumber = ({
  isFirstStep,
  isLastStep,
  currentStep,
  currentStepNumber,
}) => (
  <View style={styles.stepNumber}>
    <Text style={[styles.stepNumberText]}>{persianNumber(currentStepNumber)}</Text>
  </View>
);
export const HelpStyle = StyleSheet.create({
  main: {
    flex: 1,
  },
});
