import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Header from '@modules/Header'
import ActionBar from '@modules/ActionBar'
import Sandbox from '@modules/Sandbox'
import Canvas from '@modules/Canvas'
import Collection from '@modules/Collection'

import { useGradients } from '@providers/GradientProvider'

import { store } from '../../firebase/db'

const Gradient = (props) => {
  const { gradients } = useGradients()
  const gradientData = gradients || props.gradients

  const router = useRouter()
  const { id } = router.query

  const gradient = gradientData.filter(g => g.slug === id)

  return (
    <>
      <Head>
        <title>uiGradients</title>
      </Head>
      <Header />
      <ActionBar />
      <Sandbox>
        <Collection gradients={gradientData} />
        <Canvas gradient={gradient[0]} />
      </Sandbox>
    </>
  )
}

Gradient.displayName = 'Gradient'

Gradient.propTypes = {
  gradients: PropTypes.array
}

Gradient.getInitialProps = async () => {
  if (process.browser) return {}

  console.log('Server: Fetching from gradient')
  const gradients = await store.gradients()
  return { gradients }
}

export default Gradient
