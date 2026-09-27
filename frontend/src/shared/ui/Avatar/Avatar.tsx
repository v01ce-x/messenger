import { adapterUrl } from '@/shared/utils';
import './Avatar.scss';

interface Props {
  title: string;
  avatar?: string | null;
  className?: string;
}
const Avatar = (props: Props) => {
  const { title, avatar, className } = props;

  const avatarDefaultString = title
    .split(' ')
    .map((item) => item[0])
    .join('');

  return (
    <div
      className={`${className} avatar`}
      style={avatar ? { backgroundImage: `url(${adapterUrl(avatar)})` } : {}}
    >
      {!avatar && <span>{avatarDefaultString}</span>}
    </div>
  );
};

export default Avatar;
