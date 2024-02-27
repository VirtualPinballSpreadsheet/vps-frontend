import { format } from 'date-fns';

export const formatDate = (date?: string | number) =>
	isNaN(new Date(date || NaN).getTime())
		? '??.??.????'
		: format(new Date(date || NaN), 'dd.MM.yyyy');

export const formatDateTime = (date?: string | number) =>
	isNaN(new Date(date || NaN).getTime())
		? '??.??.????'
		: format(new Date(date || NaN), 'HH:mm - dd.MM.yyyy');

export const formatDateDashed = (date?: string | number) =>
	isNaN(new Date(date || NaN).getTime())
		? '????-??-??'
		: format(new Date(date || NaN), 'yyyy-MM-dd');
