import { Button, Grid, Input, Typography } from '@mui/material';
import React, { FC } from 'react'
import { useForm } from 'react-hook-form';

export const Penalties: FC = () => {
  const { register, watch, handleSubmit } = useForm();

  

	const onSubmit = (data: any) => {
		console.log(data);
	};

	return (
		<form className='form'>
			<Grid display='flex' flexDirection='column' alignItems='center' gap={4}>
				<Typography variant='h4' textTransform='uppercase' sx={{ marginBottom: 3 }}>
					Узнать штрафы
				</Typography>
				<Input fullWidth placeholder='' id='phone' {...register('phone')} type='text' />
				<Input fullWidth placeholder='Пароль' id='password' {...register('password')} type='password' />
			

				<Button
					type='submit'
					onClick={handleSubmit(onSubmit)}
					color='primary'
          variant='contained'
					className='form__custom-button'>
					Вход
				</Button>
			</Grid>
		</form>
	);
}
