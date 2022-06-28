import { Button, Container, Grid, Input, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { authAdmin, loginAdmin } from '../../store/reducers/adminReducer';

export const LoginPanel = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const dispatch = useAppDispatch();
	const nav = useNavigate();

	const onSubmit = (data: any) => {
		delete data.passwordRepeat;
		console.log(data);
		const promise = dispatch(loginAdmin(data))
			.then((res) => {
        if (res.meta.requestStatus === 'rejected') {
          console.log(res)
					toast.error(res.payload);
					return;
				}

				toast.success('Успешно!');
				console.log(res);
				dispatch(authAdmin()).then((res) => {
					if (res.meta.requestStatus === 'fulfilled') {
						nav('/panel', { replace: true });
						return;
					}
					console.log(res);
				});
			})
			.catch((err) => console.log(err));
	};

  useEffect(() => {
    document.title = 'Вход в админ панель'
    dispatch(authAdmin()).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        nav('/panel', { replace: true });
        return;
      }
      console.log(res);
    });
  }, [])

  

	return (
		<Container maxWidth='sm' >
			<Grid display='flex' justifyContent='center' alignItems='center' sx={{minHeight: '100vh'}}>
				<Paper
					elevation={5}
					sx={{
						padding: '60px 80px',
						width: '100%',
						'@media (max-width: 500px)': { padding: '50px 30px' },
					}}>
					<form className='form'>
						<Grid display='flex' flexDirection='column' alignItems='center' gap={4}>
							<Typography
								align='center'
								variant='h4'
								textTransform='uppercase'
								sx={{ marginBottom: 3 }}>
								Панель управления
							</Typography>
							<Input
								fullWidth
								placeholder='Логин'
								type='text'
								{...register('login', {
									required: 'Введите логин',
								})}
							/>
							<Input
								fullWidth
								placeholder='Пароль'
								{...register('password', { required: 'Введите пароль' })}
								type='password'
							/>

							<Button
								type='submit'
								onClick={handleSubmit(onSubmit)}
								color='primary'
								variant='contained'
								className='form__custom-button'>
								Вход в панель
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
				</Paper>
			</Grid>
      <Toaster />
		</Container>
	);
};
