import { formatDateDashed } from '$lib/helper/formatDate';
import { DB } from '$lib/stores/DbStore';
import type { Game, TableFile } from '$lib/types/VPin';
import { get } from 'svelte/store';
import XLSX from 'xlsx';
export interface NameOptions {
	theAtEnd?: boolean;
	edition?: boolean;
	manufacturerYear?: boolean;
	author?: boolean;
	version?: boolean;
	mod?: boolean;
	ssf?: boolean;
	vr?: boolean;
}

export const getGameNames = (game: Game, nameOptions: NameOptions): [string, TableFile][] => {
	let name = game.name;
	if (nameOptions.theAtEnd && game.name.slice(0, 4).toLowerCase() === 'the ') {
		name = `${name.slice(4).trim()}, The`;
	}
	return (
		game.tableFiles?.map((t) => [
			`${name}${
				nameOptions.edition && t.edition ? ` ${t.edition}` : ''
			}${
				nameOptions.manufacturerYear ? ` (${game.manufacturer} ${game.year})` : 
					(nameOptions.author || nameOptions.version) ? ' -' : ''
			}${
				nameOptions.author && t.authors?.length ? ` ${t.authors[0]}` : ''
			}${nameOptions.version ? ` ${t.version || ''}` : ''}${
				nameOptions.ssf && t.features?.includes('SSF') ? ` SSF` : ''
			}${nameOptions.mod && t.features?.includes('MOD') ? ` MOD` : ''}${
				nameOptions.vr && t.features?.includes('VR') ? ` VR` : ''
			}`,
			t
		]) || []
	);
};
export const getTableName = (t: TableFile, game: Game, nameOptions: NameOptions): string => {
	let name = game.name;
	if (nameOptions.theAtEnd && game.name.slice(0, 4).toLowerCase() === 'the ') {
		name = `${name.slice(4).trim()}, The`;
	}
	return `${name}${
		nameOptions.edition && t.edition ? ` ${t.edition}` : ''
	}${
		nameOptions.manufacturerYear ? ` (${game.manufacturer} ${game.year})` : 
			(nameOptions.author || nameOptions.version) ? ' -' : ''
	}${
		nameOptions.author && t.authors?.length ? ` ${t.authors[0]}` : ''
	}${nameOptions.version ? ` ${t.version || ''}` : ''}${
		nameOptions.ssf && t.features?.includes('SSF') ? ` SSF` : ''
	}${nameOptions.mod && t.features?.includes('MOD') ? ` MOD` : ''}${
		nameOptions.vr && t.features?.includes('VR') ? ` VR` : ''
	}`;
};

export const arrToStr = (arr?: string[]) => {
	if (!arr?.length) return '';
	return `${arr.join(', ')}`;
};

export const transformPopper = (tables: TableFile[], options: NameOptions) => {
	const res = [];
	const db = get(DB.dbStore);
	const _tables = JSON.parse(JSON.stringify(tables)).sort((a, b) =>
		b.game!.name > a.game!.name ? -1 : 1
	);

	for (const table of _tables) {
		const game = db[table.game!.id];

		const GameFileName = sanitizeFilename(getTableName(table, game, options));
		const GameName = sanitizeFilename(
			getTableName(table, game, {
				theAtEnd: options.theAtEnd,
				edition: options.edition,
				manufacturerYear: options.manufacturerYear,
			})
		);
		// Get all tables in game
		res.push({
			GameFileName: table.gameFileName || GameFileName,
			GameName,
			Manufact: game.manufacturer || '',
			GameYear: game.year?.toString() || '',
			NumPlayers: game.players?.toString() || '',
			GameType: game.type || '',
			Category: '',
			GameTheme: arrToStr(game.theme),
			WebLinkURL: game.ipdbUrl?.includes('.ipdb.org/machine.cgi?id=') ? `${game.ipdbUrl}` : '',
			WebLink2URL: `https://virtualpinballspreadsheet.github.io/tables?game=${game.id}&fileType=tables&fileId=${table.id}`,
			IPDBNum: game.ipdbUrl?.includes('.ipdb.org/machine.cgi?id=')
				? game.ipdbUrl.split('.cgi?id=')[1]
				: '',
			AltRunMode: '',
			DesignedBy: arrToStr(game.designers),
			Author: arrToStr(table.authors),
			GAMEVER: table.version || '',
			Rom: game.romFiles?.length ? game.romFiles[0].version || '' : '',
			Tags: arrToStr(
				table.features?.filter(
					(f) =>
						!['incl. B2S', 'incl. ROM', 'incl. Art', 'incl. PuP', 'incl. Video', 'no ROM'].includes(
							f
						)
				)
			),
			'VPS-ID': table.id,
			WebGameID: table.id,
			MasterID: game.id
		});
	}
	return res;
};

export const transformPinx = (tables: TableFile[], options: NameOptions) => {
	const res = [];
	const db = get(DB.dbStore);
	const _tables = JSON.parse(JSON.stringify(tables)).sort((a, b) =>
		b.game!.name > a.game!.name ? -1 : 1
	);

	for (const table of _tables) {
		const game = db[table.game!.id];
		const GameFileName = sanitizeFilename(getTableName(table, game, options));

		res.push({
			'Table Name (Manufacturer Year)': GameFileName,
			Manufacturer: game.manufacturer || '',
			Year: game.year?.toString() || '',
			Theme: arrToStr(game.theme),
			'Player(s)': game.players?.toString() || '',
			'IPDB Number': game.ipdbUrl?.includes('.ipdb.org/machine.cgi?id=')
				? game.ipdbUrl.split('.cgi?id=')[1]
				: '',
			'Description(s)': table.comment || '-',
			Type: game.type || '',
			'VP Version': table.tableFormat,
			'Table Author(s)': arrToStr(table.authors),
			'Table Version': table.version || '',
			'Table Date': formatDateDashed(table.updatedAt)
		});
	}
	return res;
};

export const sanitizeFilename = (input: string) => {
	// List of illegal characters in Windows filenames
	const illegalChars = /[\/:*\?"<>\|]/g;

	// Replace illegal characters with underscores
	const sanitizedFilename = input.replace(illegalChars, '_');

	return sanitizedFilename;
};
export const popperHeader = [
	'GameFileName',
	'GameName',
	'Manufact',
	'GameYear',
	'NumPlayers',
	'GameType',
	'Category',
	'GameTheme',
	'WebLinkURL',
	'IPDBNum',
	'AltRunMode',
	'DesignedBy',
	'Author',
	'GAMEVER',
	'Rom',
	'Tags',
	'VPS-ID'
];
export const pinballXHeader = [
	'Table Name (Manufacturer Year)',
	'Manufacturer',
	'Year',
	'Theme',
	'Player(s)',
	'IPDB Number',
	'Description(s)',
	'Type',
	'VP Version',
	'Table Author(s)',
	'Table Version',
	'Table Date'
];

export function stox(wb: any) {
	var out = [];
	wb.SheetNames.forEach(function (name) {
		var o = { name: name, rows: {} };
		var ws = wb.Sheets[name];
		if (!ws || !ws['!ref']) return;
		var range = XLSX.utils.decode_range(ws['!ref']);
		// sheet_to_json will lost empty row and col at begin as default
		range.s = { r: 0, c: 0 };
		var aoa = XLSX.utils.sheet_to_json(ws, {
			raw: false,
			header: 1,
			range: range
		});

		aoa.forEach(function (r, i) {
			var cells = {};
			r.forEach(function (c, j) {
				cells[j] = { text: c };

				var cellRef = XLSX.utils.encode_cell({ r: i, c: j });

				if (ws[cellRef] != null && ws[cellRef].f != null) {
					cells[j].text = '=' + ws[cellRef].f;
				}
			});
			o.rows[i] = { cells: cells };
		});

		o.merges = [];
		(ws['!merges'] || []).forEach(function (merge, i) {
			//Needed to support merged cells with empty content
			if (o.rows[merge.s.r] == null) {
				o.rows[merge.s.r] = { cells: {} };
			}
			if (o.rows[merge.s.r].cells[merge.s.c] == null) {
				o.rows[merge.s.r].cells[merge.s.c] = {};
			}

			o.rows[merge.s.r].cells[merge.s.c].merge = [merge.e.r - merge.s.r, merge.e.c - merge.s.c];

			o.merges[i] = XLSX.utils.encode_range(merge);
		});

		out.push(o);
	});

	return out;
}
