import { Typography } from '@mui/material';
import React, { FC } from 'react';

export const License: FC = (props: any) => {
	console.log(12)
	return (
		<>
			<Typography gutterBottom>
				Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
				egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
			</Typography>
			<Typography gutterBottom>
				Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus
				vel augue laoreet rutrum faucibus dolor auctor.
			</Typography>
			<Typography gutterBottom>
				Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
				scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
				auctor fringilla.
			</Typography>
		</>
	);
};
