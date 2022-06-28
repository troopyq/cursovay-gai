import { Container, Grid, Typography } from '@mui/material'
import React from 'react'
import AllAccordions from '../Accordion'
import { Header } from '../Header'

export const Home = () => {
  return (
    <>
    <Header />
    <Container>
      <Grid>
        <AllAccordions />
      </Grid>
    </Container>
    </>
  )
}
