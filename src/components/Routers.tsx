import axios from 'axios';
import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { authUser, statusEnum } from '../store/reducers/userReducer';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { Auth } from './pages/Auth';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';

export const Routers = () => {
	const { token, isAuth, status } = useAppSelector((state) => state.userReducer);
	const dispatch = useAppDispatch();

	useEffect(() => {
    dispatch(authUser()).then((res) => {
      console.log(res);
    });

	}, []);

	console.log('isAuth', isAuth);

	if (status === statusEnum.loading) {
		return <></>;
	}

	return (
		<>
			{isAuth ? (
				<Routes>
					<Route index element={<Home />} />
					<Route path='profile' element={<Profile />} />
					<Route path='auth/*' element={<Navigate to='/' />} />
					<Route path='*' element={<Home />} />
				</Routes>
			) : (
				<Routes>
					<Route path='auth' element={<Auth />}>
						<Route path='login' element={<Login />} />
						<Route path='reg' element={<Register />} />
						<Route index element={<Navigate to='login' />} />
						<Route path='*' element={<Navigate to='/auth/login' />} />
					</Route>
					<Route path='*' element={<Navigate to='/auth/login' />} />
				</Routes>
			)}
		</>
	);
};
