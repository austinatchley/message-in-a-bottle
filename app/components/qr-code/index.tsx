
export interface QrCodeProps {
    url: string;
    height?: number; // TODO: Scale the QR code image in this component
    width?: number;
}

export default function QrCode({ url }: QrCodeProps) {

    return (

        <div>
            <img className="mx-auto py-4" src={url}></img>
        </div>
    );
}