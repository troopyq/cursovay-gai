import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Grid, IconButton, Input, InputAdornment, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { authUser, regUser } from '../../store/reducers/userReducer';

export const Register = () => {
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm(
	// 	{
	// 	defaultValues: {
	// 		phone: '+79924239195',
	// 		first_name: 'Дмитрий',
	// 		last_name: 'Немков',
	// 		middle_name: 'Александрович',
	// 		email: 'n@mail.ru',
	// 		password: '12345',
	// 		passwordRepeat: '12345',
	// 	},
	// }
	);

	const [state, setState] = useState({
		showPass1: false,
		showPass2: false,
	});

	const dispatch = useAppDispatch()

	function handleClickShowPassword(type: any) {
		let key = `showPass${type}`;

		setState((prev) => ({
			...prev,
			// @ts-ignore
			[key]: !prev[key],
		}));
	}

	const nav = useNavigate()

	const equalPassword = (pass: any) => {
		if (watch('password') !== pass) return 'Пароли не совпадают';
	};
	const onSubmit = (data: any) => {
		delete data.passwordRepeat;
		// console.log(data);
		const promise = dispatch(regUser(data)).then(res => {
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
					Регистрация
				</Typography>
				
				<Input
					fullWidth
					placeholder='Фамилия'
					{...register('last_name', {
						required: 'Введите фамилию',
						pattern: {
							value:
								/^([а-я]+$)/gui,
							message: 'Неверная фамилия, введите на русском языке без пробелов',
						},
					})}
					type='text'
				/>
				<Input
					fullWidth
					placeholder='Имя'
					{...register('first_name', {
						required: 'Введите имя',
						pattern: {
							value:
								/^([а-я]+$)/gui,
							message: 'Неверное имя, введите на русском языке без пробелов',
						},
					})}
					type='text'
				/>
				<Input
					fullWidth
					placeholder='Отчество'
					{...register('middle_name', {
						required: 'Введите отчество',
						pattern: {
							value:
								/^([а-я]+$)/gui,
							message: 'Неверное отчество, введите на русском языке без пробелов',
						},
					})}
					type='text'
				/>
				<Input
					fullWidth
					placeholder='Телефон'
					{...register('phone', {
						required: 'Введите телефон',
						pattern: {
							value:
								/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm,
							message: 'Неверный номер телефона',
						},
					})}
					type='text'
				/>
				<Input
					fullWidth
					placeholder='Email'
					{...register('email', {
						required: 'Введите email',
						pattern: {
							value:
								/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
							message: 'Неверный email',
						},
					})}
				/>
				<Input
					fullWidth
					placeholder='Пароль'
					{...register('password', {
						required: 'Введите пароль',
						minLength: { message: 'Длина пароля от 5 символов', value: 5 },
					})}
					endAdornment={
						<InputAdornment position='end'>
							<IconButton
								aria-label='toggle password visibility'
								// @ts-ignore
								onClick={() => handleClickShowPassword(1)}>
								{state.showPass1 ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					}
					type={state.showPass1 ? 'text' : 'password'}
				/>
				<Input
					fullWidth
					placeholder='Пароль'
					{...register('passwordRepeat', { required: 'Повторите пароль', validate: equalPassword })}
					endAdornment={
						<InputAdornment position='end'>
							<IconButton
								aria-label='toggle password visibility'
								// @ts-ignore
								onClick={() => handleClickShowPassword(2)}>
								{state.showPass2 ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					}
					type={state.showPass2 ? 'text' : 'password'}
				/>

				<Button
					type='submit'
					onClick={handleSubmit(onSubmit)}
					color='primary'
					variant='contained'
					className='form__custom-button'>
					Зарегистрироваться
				</Button>
				{errors &&
					Object.values(errors).map((err: any, id) => {
						return (
							<Typography key={err.message + id} fontSize='16px' color='error'>
								{err.message}
							</Typography>
						);
					})}
			</Grid>
		</form>
	);
};
