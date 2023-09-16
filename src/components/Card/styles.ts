import { StyleSheet } from 'react-native';

import { COLORS, fontSizes, radius, spaces } from '@/constants';

export const style = StyleSheet.create({
  container: {
    // marginTop: 10,
  },

  description: {
    color: COLORS.black,
    fontSize: fontSizes.md,
    fontWeight: '400',
  },

  header: {
    gap: spaces[5],
  },

  image: {
    backgroundColor: COLORS.gray[400],
    borderRadius: radius.full,
    height: 55,
    justifyContent: 'space-around',
    width: 55,
  },

  title: {
    color: COLORS.black,
    fontSize: fontSizes.lg,
    fontWeight: '700',
  },

  wrapper: {
    gap: spaces[10],
    // padding: spaces[5],
  },
});
