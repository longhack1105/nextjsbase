import React from 'react';

export interface PropsTippy {
	children: React.ReactNode;
	content: string;
}

export interface PropsTippyHeadless {
	children: React.ReactNode;
	visible: boolean;
	onClickOutside: () => void;
	render: () => React.ReactNode;
	position?: 'bottom-center' | 'bottom-start' | 'bottom-end';
}
