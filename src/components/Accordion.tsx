import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Button, Container } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Dialog from './Dialog';

import { Insurance, License, Penalties, Vehicle } from './dialogs';
import { Linkk } from './Link';

const Accordion = styled((props: AccordionProps) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
	border: `1px solid ${theme.palette.divider}`,
	'&:not(:last-child)': {
		borderBottom: 0,
	},
	'&:before': {
		display: 'none',
	},
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary
		expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
		{...props}
	/>
))(({ theme }) => ({
	backgroundColor:
		theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
	flexDirection: 'row-reverse',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(90deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	},
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function AllAccordions() {
	const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const [open, setOpen] = React.useState(false);
  const nav = useNavigate()

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    nav(-1)
    setOpen(false);
  };

	const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false);
	};

	return (
		<Container maxWidth='sm'>
			{/* <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
				<AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
					<Typography>Узнать штрафы</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>Узнайте, какие нарушения вы совершили в режиме онлайн.</Typography>
					<Typography>
						После заполнения формы вам будут показаны все штрафы, которые у вас происходили.
					</Typography>
					<Linkk to='penalties'>
						<Btn onClick={handleClickOpen}>Заполнить заявку</Btn>
					</Linkk>
				</AccordionDetails>
			</Accordion> */}

			{/* <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
				<AccordionSummary aria-controls='panel2d-content' id='panel2d-header'>
					<Typography>Страхование</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>Выбор страховой компании и оформление полиса</Typography>
					<Typography>
						После заполнения формы вашу машину застрахуют в течении 5 дней. Ожидайте ответа на
						почту, о статусе страхования
					</Typography>
					<Linkk to='insurance'>
						<Btn onClick={handleClickOpen}>Заполнить заявку</Btn>
					</Linkk>
				</AccordionDetails>
			</Accordion> */}

			<Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
				<AccordionSummary aria-controls='panel3d-content' id='panel3d-header'>
					<Typography>Регистрация транспортного средства</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Постановка ТС на учет, снятие ТС с учета, перерегистрация ТС, получение дубликатов
						регистрационных знаков и документов
					</Typography>
					<Linkk to='vehicle'>
						<Btn onClick={handleClickOpen}>Заполнить заявку</Btn>
					</Linkk>
				</AccordionDetails>
			</Accordion>

			{/* <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
				<AccordionSummary aria-controls='panel3d-content' id='panel3d-header'>
					<Typography>Водительское удостоверение</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Выдача и замена национального водительского удостоверения, международное водительское
						удостоверение
					</Typography>
					<Linkk to='license'>
						<Btn onClick={handleClickOpen}>Заполнить заявку</Btn>
					</Linkk>
				</AccordionDetails>
			</Accordion> */}
			
			<Routes>
				<Route path='/' element={<Dialog open={open} onClose={handleClose} />}>
          {/* штрафы              */}
					<Route path='penalties' element={<Penalties />} /> 
          {/* страхование         */}
					<Route path='insurance' element={<Insurance />} /> 
          {/* регистрация ТС      */}
					<Route path='vehicle' element={<Vehicle />} /> 
          {/* водительские права  */}
					<Route path='license' element={<License />} /> 
				</Route>
			</Routes>
		</Container>
	);
}

function Btn(props: any) {
	return (
		<Button sx={{ marginTop: '20px' }} variant='contained' color='primary' onClick={props.onClick}>
			{props.children}
		</Button>
	);
}
