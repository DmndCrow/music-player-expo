import * as React from 'react';

import {
  Text, TextProps,
} from './Themed';

export const MonoText = (props: TextProps) => (
  <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
);
