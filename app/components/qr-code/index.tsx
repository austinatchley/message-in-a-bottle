import { Link } from "@remix-run/react";

export interface QrCodeProps {
    relativePath: string;
    height?: number; // TODO: Scale the QR code image in this component
    width?: number;
}

// Provide a high resolution version of the QR code for printing
const PRINTABLE_WIDTH: number = 1920;
const PRINTABLE_HEIGHT: number = 1080;

const BASE_URL: string = "https://message-in-a-bottle.fly.dev/";

/**
 * Given a relative path on this website, construct the full URL and use it to create an API request target for the QR Code API
 * @param relativePath The relative path on this website (e.g. if the full URL is 
 *  "https://message-in-a-bottle.fly.dev/bottles", then the relative path is "bottles"
 */
function getQrCodeUrl(relativePath: string, width: number = 100, height: number = 100) {
    const url = BASE_URL + relativePath;
    return `https://api.qrserver.com/v1/create-qr-code/?size=${width}x${height}&data=${url}`;
}

export function QrCode({ relativePath, width, height }: QrCodeProps) {

    const qrCodeUrl = getQrCodeUrl(relativePath, width, height);
    const printableQrCodeUrl = getQrCodeUrl(relativePath, PRINTABLE_WIDTH, PRINTABLE_HEIGHT);

    return (
        <div>
            { /* Redirect the user to a higher resolution version of the QR code for printing */}
            <a href={printableQrCodeUrl}> 
                <img className="mx-auto py-4" src={qrCodeUrl}></img>
            </a>
        </div>
    );
}