import {StyleSheet} from "react-native";
import {AppTheme} from "@config/type";
export const styles = (theme: AppTheme) =>
  StyleSheet.create({
    text: {
      color: theme.colors.text,
    },
  });
