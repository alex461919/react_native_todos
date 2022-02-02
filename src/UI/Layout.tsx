import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from 'react-native-paper';
import styled from 'styled-components/native';
import {
  color,
  space,
  layout,
  position,
  border,
  flexbox,
  flex,
  background,
  SpaceProps,
  ColorProps,
  LayoutProps,
  FlexboxProps,
  PositionProps,
  BorderProps,
  FlexProps,
  BackgroundProps,
} from 'styled-system';

interface IBoxProps
  extends ViewProps,
    SpaceProps,
    ColorProps,
    LayoutProps,
    FlexboxProps,
    PositionProps,
    BorderProps,
    FlexProps,
    BackgroundProps {
  children?: JSX.Element | JSX.Element[] | string | any;
}
interface ICenterProps
  extends ViewProps,
    SpaceProps,
    ColorProps,
    LayoutProps,
    Omit<FlexboxProps, 'justifyContent' | 'alignItems'>,
    PositionProps,
    BorderProps,
    FlexProps,
    BackgroundProps {
  children?: JSX.Element | JSX.Element[] | string | any;
}
interface IRowProps
  extends ViewProps,
    SpaceProps,
    ColorProps,
    LayoutProps,
    Omit<FlexboxProps, 'flexDirection'>,
    PositionProps,
    BorderProps,
    FlexProps,
    BackgroundProps {
  children?: JSX.Element | JSX.Element[] | string | any;
}

const StyledBox = styled(View)`
  ${color}
  ${space} 
    ${layout}
    ${position}
    ${border}
    ${flexbox}
    ${flex}
    ${background}
`;
const _Box = ({ children, ...props }: IBoxProps, ref: any) => {
  const theme = useTheme();
  return (
    <StyledBox ref={ref} {...{ ...{ theme }, ...props }}>
      {children}
    </StyledBox>
  );
};
const _Center = ({ children, ...props }: ICenterProps, ref: any) => {
  const theme = useTheme();
  return (
    <StyledBox ref={ref} {...{ justifyContent: 'center', alignItems: 'center', ...{ theme }, ...props }}>
      {children}
    </StyledBox>
  );
};
const _Row = ({ children, ...props }: IRowProps, ref: any) => {
  const theme = useTheme();
  return (
    <StyledBox
      ref={ref}
      {...{
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        ...{ theme },
        ...props,
      }}>
      {children}
    </StyledBox>
  );
};

export const Box = React.memo(React.forwardRef(_Box));
export const Center = React.memo(React.forwardRef(_Center));
export const Row = React.memo(React.forwardRef(_Row));
