import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const vpsTheme: CustomThemeConfig = {
	name: 'vpsTheme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': 'Jost, system-ui',
		'--theme-font-family-heading':
			"Tomorrow, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '4px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '255 255 255',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #D41976
		'--color-primary-50': '249 221 234', // #f9ddea
		'--color-primary-100': '246 209 228', // #f6d1e4
		'--color-primary-200': '244 198 221', // #f4c6dd
		'--color-primary-300': '238 163 200', // #eea3c8
		'--color-primary-400': '225 94 159', // #e15e9f
		'--color-primary-500': '212 25 118', // #D41976
		'--color-primary-600': '191 23 106', // #bf176a
		'--color-primary-700': '159 19 89', // #9f1359
		'--color-primary-800': '127 15 71', // #7f0f47
		'--color-primary-900': '104 12 58', // #680c3a
		// secondary | #4F46E5
		'--color-secondary-50': '229 227 251', // #e5e3fb
		'--color-secondary-100': '220 218 250', // #dcdafa
		'--color-secondary-200': '211 209 249', // #d3d1f9
		'--color-secondary-300': '185 181 245', // #b9b5f5
		'--color-secondary-400': '132 126 237', // #847eed
		'--color-secondary-500': '79 70 229', // #4F46E5
		'--color-secondary-600': '71 63 206', // #473fce
		'--color-secondary-700': '59 53 172', // #3b35ac
		'--color-secondary-800': '47 42 137', // #2f2a89
		'--color-secondary-900': '39 34 112', // #272270
		// tertiary | #0EA5E9
		'--color-tertiary-50': '219 242 252', // #dbf2fc
		'--color-tertiary-100': '207 237 251', // #cfedfb
		'--color-tertiary-200': '195 233 250', // #c3e9fa
		'--color-tertiary-300': '159 219 246', // #9fdbf6
		'--color-tertiary-400': '86 192 240', // #56c0f0
		'--color-tertiary-500': '14 165 233', // #0EA5E9
		'--color-tertiary-600': '13 149 210', // #0d95d2
		'--color-tertiary-700': '11 124 175', // #0b7caf
		'--color-tertiary-800': '8 99 140', // #08638c
		'--color-tertiary-900': '7 81 114', // #075172
		// success | #84cc16
		'--color-success-50': '237 247 220', // #edf7dc
		'--color-success-100': '230 245 208', // #e6f5d0
		'--color-success-200': '224 242 197', // #e0f2c5
		'--color-success-300': '206 235 162', // #ceeba2
		'--color-success-400': '169 219 92', // #a9db5c
		'--color-success-500': '132 204 22', // #84cc16
		'--color-success-600': '119 184 20', // #77b814
		'--color-success-700': '99 153 17', // #639911
		'--color-success-800': '79 122 13', // #4f7a0d
		'--color-success-900': '65 100 11', // #41640b
		// warning | #EAB308
		'--color-warning-50': '252 244 218', // #fcf4da
		'--color-warning-100': '251 240 206', // #fbf0ce
		'--color-warning-200': '250 236 193', // #faecc1
		'--color-warning-300': '247 225 156', // #f7e19c
		'--color-warning-400': '240 202 82', // #f0ca52
		'--color-warning-500': '234 179 8', // #EAB308
		'--color-warning-600': '211 161 7', // #d3a107
		'--color-warning-700': '176 134 6', // #b08606
		'--color-warning-800': '140 107 5', // #8c6b05
		'--color-warning-900': '115 88 4', // #735804
		// error | #d22519
		'--color-error-50': '248 222 221', // #f8dedd
		'--color-error-100': '246 211 209', // #f6d3d1
		'--color-error-200': '244 201 198', // #f4c9c6
		'--color-error-300': '237 168 163', // #eda8a3
		'--color-error-400': '224 102 94', // #e0665e
		'--color-error-500': '210 37 25', // #d22519
		'--color-error-600': '189 33 23', // #bd2117
		'--color-error-700': '158 28 19', // #9e1c13
		'--color-error-800': '126 22 15', // #7e160f
		'--color-error-900': '103 18 12', // #67120c
		// surface | #2d2d2f
		'--color-surface-50': '224 224 224', // #e0e0e0
		'--color-surface-100': '213 213 213', // #d5d5d5
		'--color-surface-200': '203 203 203', // #cbcbcb
		'--color-surface-300': '171 171 172', // #ababac
		'--color-surface-400': '108 108 109', // #6c6c6d
		'--color-surface-500': '45 45 47', // #2d2d2f
		'--color-surface-600': '41 41 42', // #29292a
		'--color-surface-700': '34 34 35', // #222223
		'--color-surface-800': '27 27 28', // #1b1b1c
		'--color-surface-900': '22 22 23' // #161617
	}
};
