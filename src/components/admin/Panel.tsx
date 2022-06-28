import { Grid, Container, styled, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useStorage from '../../hooks/storage';
import { IUser } from '../../models/IUser';
import { adminProps, authAdmin, getUsers, logoutAdmin } from '../../store/reducers/adminReducer';
import { formProps, getForms } from '../../store/reducers/formReducer';
import { Linkk } from '../Link';

export const Panel = () => {
  const [users, setUsers] = useState<IUser[] | []>([])
  const nav = useNavigate();
	const { removeItem } = useStorage();
	const dispatch = useAppDispatch();
	const { data: userData, token, isAuth } = useAppSelector<adminProps>((state) => state.adminReducer);
	const { data: formData } = useAppSelector<formProps>((state) => state.formReducer);
  

	function onLogout() {
		dispatch(logoutAdmin());
		nav('/admin', { replace: true });
	}

  useEffect(() => {
    document.title = 'Панель управления'
    dispatch(authAdmin()).then(res => {
      console.log(res)
      if(res.meta.requestStatus === 'fulfilled'){
        dispatch(getUsers()).then(res => {
          if(res.meta.requestStatus === 'fulfilled'){
            setUsers(res.payload)
          }
        })
      } else{
        nav('/admin', {replace: true})
      }
    })

    
  }, [])
  
	return (
		<>
			<PanelHeader sx={{ padding: 2, marginBottom: 5 }}>
				<Container>
					<Grid display='flex' justifyContent='space-between' alignItems='center'>
						<Linkk to='/'>
							<Typography variant='h4' color='white'>
								ГИБДД
							</Typography>
						</Linkk>
            <Typography variant='h6' color='white'>
              Панель управления
            </Typography>
            <Grid display='flex' alignItems='center' gap={4}>
            <Typography variant='h6' color='white'>
              {userData?.login}
            </Typography>
            <Button variant='contained' color='warning' onClick={onLogout}>
            Выйти
          </Button>
            </Grid>
					</Grid>
				</Container>
			</PanelHeader>

      <Container>
        <Grid display='flex' flexDirection='column' gap={2} >
          {users.map((user) => {
            // @ts-ignore
            delete user.password
            // @ts-ignore
            delete user.token
            return <Grid sx={{background: 'rgba(0,0,0,.05)'}}  padding={2} display='flex' gap={2}>
              {Object.values(user).map(el => (<Typography>{el}</Typography>))}
              {/* {user.lastName} {user.firstName} {user.middleName} {user.phone} {user.email} {user.date} */}
            </Grid>
          })}
        </Grid>
      </Container>
      
		</>
	);
};

export const PanelHeader = styled(Grid)((theme) => {
	const color = theme.theme.palette.primary.main;
	return {
		background: color,
		boxShadow: '0 3px 12px rgba(0,0,0, .25)',
		color: 'white',
	};
});
