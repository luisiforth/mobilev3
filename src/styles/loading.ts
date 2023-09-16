import styled, { keyframes, css, StyledComponent } from 'styled-components'

const skeletonAnimation = keyframes`
  0% {
    background-position: -200%;
  }
  100% {
    background-position: 200%;
  }
`

type isLoadingStylesType = {
  isLoading: boolean
}

const backgroundColorAnimation = css<isLoadingStylesType>`
  ${({ theme, isLoading }) =>
    isLoading &&
    css`
      cursor: wait;
      border: none;

      &:hover {
        background-color: initial;
        border: none;
      }

      background: linear-gradient(
        90deg,
        ${theme.colors['gray-100']} 0%,
        ${theme.colors['gray-200']} 5%,
        ${theme.colors['gray-300']} 15%,
        ${theme.colors['gray-300']} 45%,
        ${theme.colors['gray-200']} 70%,
        ${theme.colors['gray-100']} 85%
      );
      background-size: 200% 100%;
      animation: ${skeletonAnimation} 3.5s infinite;

      > * {
        visibility: hidden;
      }
    `}
`

export const withLoadingStyles = <P extends object>(
  Component: StyledComponent<any, any, P, any>
) => styled(Component)`
  ${backgroundColorAnimation}
`
