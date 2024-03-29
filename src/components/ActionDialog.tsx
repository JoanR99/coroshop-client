import * as AlertDialog from '@radix-ui/react-alert-dialog';

import Button from './Button';
import { styled } from '../../stitches.config';
import { keyframes } from '@stitches/react';
import { ReactNode } from 'react';

type Props = {
	mutationHandler: () => Promise<void>;
	loading: boolean;
	button: ReactNode;
	children: ReactNode;
	action: string;
};

const overlayShow = keyframes({
	from: {
		opacity: 0,
	},
	to: {
		opacity: 1,
	},
});

const contentShow = keyframes({
	from: {
		opacity: 0,
		transform: 'translate(-50%, -48%) scale(0.96)',
	},
	to: {
		opacity: 1,
		transform: 'translate(-50%, -50%) scale(1)',
	},
});

const Overlay = styled(AlertDialog.Overlay, {
	backgroundColor: '#0000007d',
	position: 'fixed',
	inset: 0,
	animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

const Content = styled(AlertDialog.Content, {
	backgroundColor: '$light',
	borderRadius: '6px',
	boxShadow:
		'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '90vw',
	maxWidth: '500px',
	maxHeight: '85vh',
	padding: '25px',
	animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,

	'&:focus': {
		outline: 'none',
	},
});

export const DialogTitle = styled(AlertDialog.Title, {
	margin: 0,
	fontSize: '17px',
	fontWeight: 'bold',
	color: '$main_dark',
	mb: '10px',
});

export const DialogDescription = styled(AlertDialog.Description, {
	fontSize: '15px',
	color: '$main_dark',
	mb: '20px',
	lineHeight: '1.5',
});

const ButtonContainer = styled('div', {
	display: 'flex',
	gap: 25,
	justifyContent: 'flex-end',
});

const ActionDialog = ({
	mutationHandler,
	loading,
	button,
	action,
	children,
}: Props) => {
	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger asChild>
				<div>{button}</div>
			</AlertDialog.Trigger>
			<AlertDialog.Portal>
				<Overlay />
				<Content>
					{children}
					<ButtonContainer>
						<AlertDialog.Cancel asChild>
							<Button
								variant="ghost"
								size={{
									'@initial': 'small',
									'@md': 'normal',
								}}
								fontSize="1"
							>
								Cancel
							</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action asChild>
							<Button
								variant="main"
								onClick={() => mutationHandler()}
								disabled={loading}
								size={{
									'@initial': 'small',
									'@md': 'normal',
								}}
								fontSize="1"
							>
								{action}
							</Button>
						</AlertDialog.Action>
					</ButtonContainer>
				</Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
};

export default ActionDialog;
