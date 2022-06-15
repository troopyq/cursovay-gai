import { Button, Grid, styled, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'

export const Header = () => {
  return (
    <HeaderStyled sx={{padding: 2, marginBottom: 5}}>
      <Container>
        <Grid display='flex' justifyContent='space-between' alignItems='center'>
        <Typography variant='h4' color='white'>
          ГИБДД
        </Typography>
        <Button variant='text'>
          <Typography color='white'>
            Войти
          </Typography>
        </Button>
        </Grid>
      </Container>
    </HeaderStyled>
  )
}

export const HeaderStyled = styled('div')(theme => {
  console.log(theme)
  const color = theme.theme.palette.primary.main
  return ({
    background: color,
    boxShadow: '0 3px 12px rgba(0,0,0, .25)'
  })
})
