import VideoOnIcon from '../../icons/VideoOnIcon';
import VideoOffIcon from '../../icons/VideoOffIcon';

export default function VideoIndicator({ isVideoEnabled }: { isVideoEnabled: boolean }) {
  console.log('isVideoEnabled:', isVideoEnabled);
  return isVideoEnabled ? <VideoOnIcon /> : <VideoOffIcon />;
}
