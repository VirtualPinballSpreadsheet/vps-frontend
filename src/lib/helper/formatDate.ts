import { format } from 'date-fns';

export const formatDate = (date: string | number) =>
	isNaN(new Date(date).getTime()) ? '??.??.????' : format(new Date(date), 'dd.MM.yyyy');

export const formatDateTime = (date: string | number) =>
	isNaN(new Date(date).getTime()) ? '??.??.????' : format(new Date(date), 'HH:mm - dd.MM.yyyy');

export const formatDateDashed = (date: string | number) =>
	isNaN(new Date(date).getTime()) ? '????-??-??' : format(new Date(date), 'yyyy-MM-dd');
