// https://codesandbox.io/s/svelte-easy-crop-with-file-upload-and-live-preview-36xsr?file=/canvasUtils.js
//@ts-nocheck
export const createImage = (url) =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener('load', () => resolve(image));
		image.addEventListener('error', (error) => reject(error));
		image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
		image.src = url;
	});

export function getRadianAngle(degreeValue) {
	return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width, height, rotation) {
	const rotRad = getRadianAngle(rotation);

	return {
		width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
		height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height)
	};
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export async function getCroppedImg(
	imageSrc,
	pixelCrop,
	rotation = 0,
	flip = { horizontal: false, vertical: false }
) {
	const image = await createImage(imageSrc);
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	if (!ctx) {
		return null;
	}

	const rotRad = getRadianAngle(rotation);

	// calculate bounding box of the rotated image
	const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation);

	// set canvas size to match the bounding box
	canvas.width = bBoxWidth;
	canvas.height = bBoxHeight;

	// translate canvas context to a central location to allow rotating and flipping around the center
	ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
	ctx.rotate(rotRad);
	ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
	ctx.translate(-image.width / 2, -image.height / 2);

	// draw rotated image
	ctx.drawImage(image, 0, 0);

	// croppedAreaPixels values are bounding box relative
	// extract the cropped image using these values
	const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

	// set canvas width to final desired crop size - this will clear existing context
	canvas.width = pixelCrop.width;
	canvas.height = pixelCrop.height;

	// paste generated rotate image at the top left corner
	ctx.putImageData(data, 0, 0);

	// As Base64 string
	// return canvas.toDataURL('image/jpeg');

	// As a blob
	return new Promise((resolve, reject) => {
		canvas.toBlob((file) => {
			resolve([file, URL.createObjectURL(file)]);
		}, 'image/jpeg');
	});
}

export const compress = async (blobURL: string) => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.src = blobURL;
		img.onerror = function () {
			URL.revokeObjectURL(this.src);
			// Handle the failure properly
			console.log('Cannot load image');
		};
		img.onload = function () {
			//@ts-ignore
			URL.revokeObjectURL(this.src);
			const [newWidth, newHeight] = calculateSize(img, 1000, 1000);
			const canvas = document.createElement('canvas');
			canvas.width = newWidth;
			canvas.height = newHeight;
			const ctx = canvas.getContext('2d');
			//@ts-ignore
			ctx.drawImage(img, 0, 0, newWidth, newHeight);
			canvas.toBlob(
				(blob) => {
					// Handle the compressed image. es. upload or save in local state
					//   displayInfo('Original file', file);
					//   displayInfo('Compressed file', blob);
					resolve([blob as File, URL.createObjectURL(blob)]);
				},
				'image/webp',
				0.6
			);
		};
	});
};

function calculateSize(img: HTMLImageElement, maxWidth: number, maxHeight: number) {
	let width = img.width;
	let height = img.height;

	// calculate the width and height, constraining the proportions
	if (width > height) {
		if (width > maxWidth) {
			height = Math.round((height * maxWidth) / width);
			width = maxWidth;
		}
	} else {
		if (height > maxHeight) {
			width = Math.round((width * maxHeight) / height);
			height = maxHeight;
		}
	}
	return [width, height];
}
