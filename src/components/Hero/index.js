import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { Container, Button } from 'react-bootstrap'
import { sortBy } from 'lodash'

import Icon from '../Icon'

import everstake from './img/everstake.svg'

import * as s from './Hero.module.scss'

const Hero = () => {
  const {
    allFile: { nodes: partners },
  } = useStaticQuery(graphql`
    {
      allFile(
        filter: {
          relativeDirectory: { eq: "partners" }
          name: { nin: ["casper", "arbitrum", "optimism"] }
        }
      ) {
        nodes {
          name
          publicURL
        }
      }
    }
  `)

  const ORDER = ['solana', 'terra', 'cosmos', 'polygon', 'ethereum', 'polkadot']

  const sortedPartners = sortBy(partners, ({ name }) => ORDER.indexOf(name))

  return (
    <Container as="section" className={s.hero}>
      <div className={s.hero__info}>
        <div className={s.hero__content}>
          <h1>Money is cheap, expertise is priceless. We bridge the gap.</h1>
          <p className="lead">
            Everstake Capital invests in early-stage blockchain startups and
            shares its profound technological expertise with them.
          </p>
          <Button as={Link} to="/contact">
            Pitch idea
            <Icon name="bulb" />
          </Button>
        </div>
        <div className={s.hero__img}>
          <StaticImage
            src="./img/hero.png"
            width={500}
            quality={100}
            placeholder="none"
            alt="Illustration"
          />
        </div>
      </div>
      <div className={s.partners}>
        <div className={s.partners__built}>Invests in projects built on</div>
        <div className={s.partners__provider}>
          Backed by the biggest staking provider
          <img src={everstake} alt="Everstake" />
        </div>
        <div className={s.partners__items}>
          {sortedPartners.map(({ name, publicURL }) => (
            <img key={name} src={publicURL} alt={name} />
          ))}
        </div>
      </div>
    </Container>
  )
}

export default Hero
