import React, { useEffect, useRef, useState } from "react";
import { Animated, TextStyle } from "react-native";

interface NumberTickerProps {
  value: number;
  startValue?: number;
  direction?: "up" | "down";
  delay?: number; // in seconds
  decimalPlaces?: number;
  style?: TextStyle;
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  decimalPlaces = 0,
  style,
}: NumberTickerProps) {
  const animatedValue = useRef(new Animated.Value(direction === "down" ? value : startValue)).current;
  const [displayValue, setDisplayValue] = useState(startValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.spring(animatedValue, {
        toValue: direction === "down" ? startValue : value,
        useNativeDriver: false,
        damping: 20,
        stiffness: 100,
      }).start();
    }, delay * 1000);

    const listenerId = animatedValue.addListener(({ value }) => {
      setDisplayValue(parseFloat(value.toFixed(decimalPlaces)));
    });

    return () => {
      clearTimeout(timer);
      animatedValue.removeListener(listenerId);
    };
  }, [value, direction, delay]);

  return (
    <Animated.Text style={[{ fontSize: 32, color: "black", fontWeight: "bold" }, style]}>
      {displayValue.toFixed(decimalPlaces)}+
    </Animated.Text>
  );
}
