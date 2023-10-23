import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Alert, setNotification } from '../../Redux/notifications';
import { Header } from '../../components/Header/Header';
import { getNotifications, markNotificationRead } from '../../lib/api';
import store from '../../Redux/store';
import icons from '../../assets/icons/icons';
import TapMotion from '../../components/TapMotion';
import { PopupAlertType, usePopupAlertContext } from '../../context/PopupAlertContext';
import transitions from '../../lib/transition';
import { Watermark } from '../../components/Extras';

async function loadNotifications() {
  const notificationStatus = await getNotifications();
  if (!notificationStatus.status) return;
  store.dispatch(setNotification((notificationStatus.data.data.notifications as Notification[]) || []));

  // Now Mark all notifications as read
  await markNotificationRead();
}

export default function Notifications() {
  const notifications: Alert[] = useSelector((state: any) => state.notifications);

  useEffect(() => {
    loadNotifications();
  }, []);

  console.log(notifications);
  if (!notifications) return <NotificationsShimmer />;

  return (
    <>
      <Header>
        <span className='font-normMid'>Notifications</span>
      </Header>
      <div className='mx-auto max-w-xl px-5 pb-5 pt-2'>
        {notifications.length === 0 ? <NoNotifications /> : <NotificationsList notifications={notifications} />}
      </div>
    </>
  );
}

function NotificationsList({ notifications }: { notifications: Alert[] }) {
  const { newPopup } = usePopupAlertContext();
  return (
    <div className='flex min-h-[85dvh] select-none flex-col justify-between'>
      <div className='flex flex-col justify-between gap-3'>
        {notifications.map((notification, index) => (
          <NotificationItem key={notification?.id} notification={notification} newPopup={newPopup} index={index} />
        ))}
      </div>
      <Watermark />
    </div>
  );
}

const colors = [
  'bg-green-500',
  'bg-blue-500',
  'bg-rose-500',
  'bg-purple-500',
  'bg-orange-500',
  'bg-indigo-500',
  'bg-pink-500',
  'bg-violet-500',
  'bg-lime-500',
  'bg-cyan-500',
  'bg-red-500',
  'bg-fuchsia-500',
  'bg-sky-500',
  'bg-amber-500',
];

function getColor(index: number) {
  return colors[index % colors.length];
}

function NotificationItem({
  notification,
  newPopup,
  index,
}: {
  notification: Alert;
  newPopup: (popup: PopupAlertType) => void;
  index: number;
}) {
  return (
    <TapMotion
      size='lg'
      className='flex items-center justify-between gap-4 rounded-3xl bg-inputBg p-4 dark:bg-white/10'
      onClick={transitions(() => {
        newPopup({
          title: <span>{notification?.title || 'Notification'}</span>,
          subTitle: <span className='opacity-80'> {notification?.subtitle || 'Notification Subtitle'}</span>,
          action: [{ text: 'OK, Got it', className: 'text-accent mt-1 mb-1' }],
        });
      })}
    >
      <div
        className={`flex aspect-square h-12 w-12 flex-grow-0 items-center justify-center rounded-full ${getColor(
          index,
        )}`}
      >
        <img src={icons.notification_bell} className='w-1/2 invert' />
      </div>
      <div className='flex flex-grow flex-col gap-1'>
        <span className='line-clamp-1 text-xs font-normMid'>{notification?.title}</span>
        <span className='line-clamp-2 text-[0.7rem] font-normMid text-neutral-500'>{notification?.subtitle}</span>
      </div>
    </TapMotion>
  );
}

function NoNotifications() {
  return (
    <div className='flex min-h-[85dvh] w-full flex-col items-center justify-center space-y-2'>
      <span className='text-xs font-normMid text-neutral-500'>No Notification</span>
    </div>
  );
}
function NotificationsShimmer() {
  return (
    <>
      <Header>
        <span className='font-normMid'>Notifications</span>
      </Header>
      <div className='flex flex-col gap-3 p-5 pt-2'>
        {Array(7)
          .fill(0)
          .map((_, index) => (
            <div key={index} className='shimmer flex items-center justify-between gap-3 rounded-3xl p-4'>
              <div className='flex aspect-square h-12 w-12 flex-grow-0 items-center justify-center rounded-full bg-white/50 backdrop-blur-md dark:bg-black/50'>
                <img src={icons.notification_bell} className='w-1/2 opacity-40 invert' />
              </div>
              <div className='flex flex-grow flex-col gap-1.5'>
                <span className='h-3.5 rounded-xl bg-white/50 text-xs font-normMid backdrop-blur-md dark:bg-black/50'></span>
                <span className='h-2.5 w-4/5 rounded-xl bg-white/50 text-[0.7rem] font-normMid backdrop-blur-md dark:bg-black/50'></span>
                <span className='h-2.5 w-4/5 rounded-xl bg-white/50 text-[0.7rem] font-normMid backdrop-blur-md dark:bg-black/50'></span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
