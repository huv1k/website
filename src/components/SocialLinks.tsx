import styled from 'styled-components'
import { Icon, IconType } from './Icons'

interface Props {
  type: IconType
  title: string
  link: string
}

const SocialLink = ({ link, title, type }: Props) => (
  <Link href={link} title={title} target="_blank" rel="nofollow">
    <Icon type={type} />
  </Link>
)

export const SociaLinks = () => (
  <Menu>
    <SocialLink
      type="github"
      title="Huvik Github"
      link="https://github.com/huv1k"
    />
    <SocialLink
      type="twitter"
      title="Huvik Twitter"
      link="https://twitter.com/huv1k"
    />
    <SocialLink
      type="instagram"
      title="Huvik Instagram"
      link="https://www.instagram.com/huv1k/"
    />
  </Menu>
)

const Menu = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: flex;
  flex-flow: column;
`

const Link = styled.a`
  width: 2.4rem;
  height: 2.4rem;
  margin-bottom: 1rem;
  color: ${p => p.theme.colors.text};
  transition: color 125ms ease-in;

  &:hover {
    color: ${p => p.theme.colors.detail};
  }
`
