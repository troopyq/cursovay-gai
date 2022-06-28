import {
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Grid,
	Input,
	InputLabel,
	List,
	ListItem,
	MenuItem,
	Radio,
	RadioGroup,
	Select,
	Typography,
} from '@mui/material';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { postForm } from '../../store/reducers/formReducer';
import { userProps } from '../../store/reducers/userReducer';

export const Vehicle: FC = (props: any) => {
	const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch()
  const {data: userData} = useAppSelector<userProps>(state => state.userReducer)

	const onSubmit = (data: any) => {
		console.log(data);
    dispatch(postForm({form: data, userId: userData!.id})).then(res =>{
      console.log(res)
      if(res.meta.requestStatus === 'fulfilled'){
        toast.success("Заявка успешно отправлена")
      } else {
        toast.success(res.payload.message)
      }
    })
	};

	return (
		<form className='form'>
			<Grid display='flex' flexDirection='column' alignItems='center' gap={4}>
				<Typography align='center' variant='h4' textTransform='uppercase' sx={{ marginBottom: 3 }}>
					Поставить машину на учёт
				</Typography>
        <Typography variant='body1'>
					Принесите с собой:
				</Typography>
        <List sx={{ listStyleType: 'disc', paddingLeft: 3 }}>
						<ListItem sx={{ display: 'list-item' }}>документ, удостоверяющий личность;</ListItem>
						<ListItem sx={{ display: 'list-item' }}>
							документ, удостоверяющий полномочия заявителя на представление интересов владельца
							транспортного средства;
						</ListItem>
						<ListItem sx={{ display: 'list-item' }}>паспорт транспортного средства (ПТС);</ListItem>
						<ListItem sx={{ display: 'list-item' }}>
							свидетельство о регистрации транспортного средства (СТС);
						</ListItem>
						<ListItem sx={{ display: 'list-item' }}>
							свидетельство безопасности конструкции транспортного средства, если есть;
						</ListItem>
						<ListItem sx={{ display: 'list-item' }}>
							акт осмотра группы транспортных средств, если есть;
						</ListItem>
						<ListItem sx={{ display: 'list-item' }}>
							документ, удостоверяющий право собственности на автомототранспортное средство и(или)
							прицеп либо на номерной агрегат.
						</ListItem>
					</List>

				<Typography variant='body1' sx={{ marginBottom: 3 }}>
					Пройдите техосмотр.
				</Typography>
				<FormControl fullWidth>
					<InputLabel id='demo-simple-select-label'>Выберите транспортное средство</InputLabel>
					<Select
						labelId='Выберите транспортное средство'
						label='Выберите транспортное средство'
            defaultValue='Автомобиль или автобус'
						{...register('transport')}
            >
						<MenuItem selected defaultChecked value='Автомобиль или автобус'>
							Автомобиль или автобус
						</MenuItem>
						<MenuItem value='Прицеп'>Прицеп</MenuItem>
						<MenuItem value='Прочие транспортные средства'>Прочие транспортные средства</MenuItem>
					</Select>
				</FormControl>
				<FormControl fullWidth>
					<InputLabel id='demo-simple-select-label'>Вы являетесь</InputLabel>
					<Select
						labelId='Вы являетесь'
						label='Вы являетесь'
						defaultValue='Собственником'
            {...register('person')}
            >
						<MenuItem selected defaultChecked value='Собственником'>
							Собственником
						</MenuItem>
						<MenuItem value='Доверенным представителем физического лица'>
							Доверенным представителем физического лица
						</MenuItem>
						<MenuItem value='Доверенным представителем юридического лица'>
							Доверенным представителем юридического лица
						</MenuItem>
					</Select>
				</FormControl>
			

				<FormControl fullWidth>
					<FormGroup>
          <FormLabel>Требуется ли вам получение государственного регистрационного знака?</FormLabel>
						<FormControlLabel {...register('requiredLicenseNumber')} control={<Checkbox defaultChecked />} label='Да' />
					</FormGroup>
				</FormControl>

				<FormControl fullWidth>
					<FormLabel>Паспорт транспортного средства (ПТС)</FormLabel>
					<RadioGroup
						aria-labelledby='Паспорт транспортного средства (ПТС)'
            defaultValue="Внести изменения в действующий"
            
            >
						<FormControlLabel {...register('pts')} value='Получить новый' control={<Radio />} label='Получить новый' />
						<FormControlLabel {...register('pts')} value='Внести изменения в действующий' control={<Radio />} label='Внести изменения в действующий' />
						<FormControlLabel {...register('pts')} value='У меня электронный ПТС' control={<Radio />} label='У меня электронный ПТС' />
					</RadioGroup>
				</FormControl>

        <FormControl fullWidth>
					<InputLabel>Категория транспорта</InputLabel>
					<Select
						labelId='Категория транспорта'
						label='Категория транспорта'
            defaultValue="A1"
            {...register('category')}
						>
						<MenuItem value='A1'>
							A1
						</MenuItem>
						<MenuItem value='A2'>
							A2
						</MenuItem>
						<MenuItem value='B'>
							B
						</MenuItem>
						<MenuItem value='B1'>
							B1
						</MenuItem>
						<MenuItem value='C'>
							C
						</MenuItem>
						<MenuItem value='C1'>
							C1
						</MenuItem>
						<MenuItem value='D'>
							D
						</MenuItem>
						<MenuItem value='D1'>
							D1
						</MenuItem>
						<MenuItem value='M'>
							M
						</MenuItem>
					</Select>
				</FormControl>

				{/* <Input
					fullWidth
					placeholder='Выберите транспортное средство'
					id='phone'
					{...register('phone')}
					type='text'
				/>
				<Input
					fullWidth
					placeholder='Пароль'
					id='password'
					{...register('password')}
					type='password'
				/> */}

				<Button
					type='submit'
					onClick={handleSubmit(onSubmit)}
					color='primary'
					variant='contained'
					>
					Отправить заявку
				</Button>
			</Grid>
      <Toaster />
		</form>
	);
};
