import { Box, Grid, Paper,  } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { authUser } from '../../store/reducers/userReducer';
import { Login } from '../auth/Login';
import { Register } from '../auth/Register';
import { Header } from '../Header';

export const Auth = () => {
	// const loc = useLocation()
	// console.log(loc)
	// const [,...path] = loc.pathname.split('/')
	// console.log(path)
	// if(path[0] !== 'auth'){
	// 	if(path[1] !== 'login' && path[1] !== 'reg'){
	// 		return (<Navigate to='login' replace />)
	// 	}
	// 	return <Navigate to='auth/login' replace />
	// }
	const {token} = useAppSelector(state => state.userReducer)
	const dispatch = useAppDispatch()
	
	useEffect(() => {
		document.title = 'Авторизация'
		if(token){
			dispatch(authUser()).then(res =>{
				console.log(res)
			})
		}
	}, [])
	

	return (
		<>

		<Header />
		<Container maxWidth='sm' >
			<Grid  display='flex' justifyContent='center' alignItems='center' >
				<Paper  elevation={5} sx={{padding: '60px 80px', width: '100%', '@media (max-width: 500px)': {padding: '50px 30px'}}}>
					<Outlet />
				</Paper>
			</Grid>
    </Container>
		<Toaster />
		</>

	);
};
