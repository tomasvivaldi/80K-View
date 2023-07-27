import { AppConfig } from '@/utils/AppConfig';
import Image from 'next/image';

type ILogoProps = {
  xl?: boolean;
  dark?: boolean;
};

const Logo = (props: ILogoProps) => {
  const size = props.xl ? '44' : '32';
  const fontStyle = props.xl
    ? 'font-semibold text-2xl'
    : 'font-semibold text-xl';
  const textColor = props.dark ? 'text-gray-100' : 'text-gray-900';

  return (
    <div
      className={`${textColor} flex items-center justify-center ${fontStyle}`}
    >
      <Image
        className="mr-1"
        src="/logo.png"
        width={size}
        height={size}
        alt="Logo"
      />

      {AppConfig.site_name}
    </div>
  );
};

export { Logo };
