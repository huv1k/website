import * as React from 'react'
import styled from 'styled-components'
import { SociaLinks } from '../components/SocialLinks'
import { Layout } from '../components/Layout'
import { NextPage } from 'next'

const Index: NextPage = () => (
  <Layout>
    <Container>
      <SociaLinks />
      <Content>
        <Subtitle>Huvik</Subtitle>
        <Title>Lukáš Huvar</Title>
        <Description>
          Software developer passionate about <b>React</b>, <b>GraphQL</b>,
          <b>Typescript</b>
        </Description>
      </Content>
    </Container>
  </Layout>
)

export default Index

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`

const Content = styled.div``

const Subtitle = styled.p`
  position: relative;
  font-size: 3rem;
  margin-left: 2rem;

  &:before {
    display: block;
    content: '';
    position: absolute;
    top: 50%;
    left: -1.2rem;
    width: 0.5rem;
    height: 3rem;
    background: ${p => p.theme.colors.detail};
    transform: translate(-50%, -50%);
  }
`

const Description = styled.p`
  font-size: 3rem;
`

const Title = styled.h1`
  font-size: 8rem;
  line-height: 1.1;
  font-weight: 700;
  margin-bottom: 1.6rem;
`
