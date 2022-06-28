import { Button, Grid, Input, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { authUser, loginUser } from '../../store/reducers/userReducer';

export const Login = () => {
	const { register, handleSubmit, formState: { errors } } = useForm(
		// {defaultValues: {
		// phone: '+79924239195',
		// password: '12345'
	// }}
	);
	const dispatch = useAppDispatch()
	const nav = useNavigate()

	const onSubmit = (data: any) => {
		delete data.passwordRepeat;
		// console.log(data);
		const promise = dispatch(loginUser(data)).then(res => {
			if(res.meta.requestStatus === 'rejected'){
				toast.error(res.payload)
				return
			}
			
			toast.success('Успешно!')
			// console.log(res)
			dispatch(authUser()).then(res => {
				if(res.meta.requestStatus === 'fulfilled'){
					nav('/', {replace: true})
					return
				}
				// console.log(res)
			})

		}).catch(err => console.log(err))

	};


	return (
		<form className='form'>
			<Grid display='flex' flexDirection='column' alignItems='center' gap={4}>
				<Typography align='center' variant='h4' textTransform='uppercase' sx={{ marginBottom: 3 }}>
					Вход
				</Typography>
				<Input
					fullWidth
					placeholder='Email'
					type='email'
					{...register('email', {
						required: 'Введите email',
						pattern: {
							value:
								/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
							message: 'Неверный email',
						},
					})}
				/>
				<Input fullWidth placeholder='Пароль' {...register('password', {required: 'Введите пароль', minLength: {message: 'Длина пароля от 5 символов', value: 5}})} type='password' />

				<Button

					type='submit'
					onClick={handleSubmit(onSubmit)}
					color='primary'
					variant='contained'
					className='form__custom-button'>
					Вход
				</Button>
				{errors && (
					Object.values(errors).map((err: any, id) => {
						return <Typography key={err.message + id} fontSize='16px' color='error' >{err.message}</Typography>
					})
				)}
			</Grid>
		</form>
	);
};
