import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  margin: 0;
  padding: 15px;
  gap: 10px;
`;

const WrapperFlatList = styled.View`
  flex: 1;
`;

export const Root = {
  Wrapper: Wrapper,
  WrapperFlatList: WrapperFlatList,
  // BarTop: BarTop
};
