import { Button, Grid, styled, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Linkk } from './Link';
import { useAppSelector } from '../hooks/redux';
import { userProps } from '../store/reducers/userReducer';

export const Header = () => {
  const {isAuth, data } = useAppSelector(state => state.userReducer) as userProps

	return (
		<HeaderStyled sx={{ padding: 2, marginBottom: 5 }}>
			<Container>
				<Grid display='flex' justifyContent='space-between' alignItems='center'>
					<Linkk to='/'>
						<Typography variant='h4' color='white'>
							ГИБДД
						</Typography>
					</Linkk>
          {isAuth ?
            <Linkk to='/profile' >
              <Grid sx={{color: 'white'}} display='flex' alignItems='center' gap={1} >
              <AccountCircleIcon fontSize='large' />
              <Typography>
                {`${data!.lastName} ${data!.firstName[0]}. ${data!.middleName[0]}.`}
              </Typography>
            </Grid>
            </Linkk>
           :
           <Grid>
						<Linkk to='/auth/login'>
							<Button variant='text'>
								<Typography color='white'>Войти</Typography>
							</Button>
						</Linkk>
						<Linkk to='/auth/reg'>
							<Button variant='text'>
								<Typography color='white'>Регистрация</Typography>
							</Button>
						</Linkk>
					</Grid>
           }
					
				</Grid>
			</Container>
		</HeaderStyled>
	);
};

export const HeaderStyled = styled('div')((theme) => {
	const color = theme.theme.palette.primary.main;
	return {
		background: color,
		boxShadow: '0 3px 12px rgba(0,0,0, .25)',
	};
});
