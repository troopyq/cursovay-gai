import { Button, Container, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useStorage from '../../hooks/storage';
import { formProps, getForms } from '../../store/reducers/formReducer';
import { logoutUser, userProps } from '../../store/reducers/userReducer';
import { Header } from '../Header';

export const Profile = () => {
	const nav = useNavigate();
	const { removeItem } = useStorage();
	const dispatch = useAppDispatch();
	const { data: userData } = useAppSelector<userProps>((state) => state.userReducer);
	const { data: formData } = useAppSelector<formProps>((state) => state.formReducer);
  
  

	function onLogout() {
		dispatch(logoutUser());
		nav('/', { replace: true });
	}

  useEffect(() => {
    document.title = 'Личный кабинет'
    // @ts-ignore
    dispatch(getForms(userData!.id)).then(res => {
      // console.log(res)
    })
  }, [])
  

	return (
		<>
			<Header />
			<Container>
				<Typography variant='h4'>Личный кабинет</Typography>
				<Grid sx={{paddingBlock: 4}}>
        <Typography variant='h5'>ФИО: {userData?.lastName} {userData?.firstName} {userData?.middleName}</Typography>
        <Typography variant='h5'>Почта: {userData?.email}</Typography>
        <Typography variant='h5'>Телефон: {userData?.phone}</Typography>
        <Typography variant='h5'>Дата регистрации: {userData?.date}</Typography>
        </Grid>
        <Grid display='flex' flexDirection='column' sx={{paddingBlock: 4}} gap={4}>
        <Typography variant='h5'>Ваши заявки:</Typography>
          {formData ? formData.map((el: any) => {
            console.log(el)
            type FormType = ReturnType<typeof el>
            let {id, form} = el
            form = JSON.parse(form)
            console.log(form)
            return (<Grid><Typography>{el.date}</Typography><Grid display='flex' gap={2} sx={{background: 'rgba(0,0,0,.05)', borderRadius: '5px'}} padding={2} key={id}>
              
              {Object.values(form).map((prop: any) => {
                console.log(prop)
                return (<Typography>{prop}</Typography>)
              })}
            </Grid></Grid>)
          }) 
          :
          <Typography>Нет последних заявок</Typography>
          }
        </Grid>

				<Button sx={{ marginBlock: 4 }} variant='contained' color='warning' onClick={onLogout}>
					Выйти
				</Button>
			</Container>
		</>
	);
};
