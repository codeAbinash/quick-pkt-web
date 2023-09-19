import Lottie, { LottieComponentProps } from 'lottie-react';
import loading from '../assets/animations/loading.json';
import useFetchAnimation from '../hooks/useFetchAnimation';

type LottieAnimationProps = Omit<
  LottieComponentProps & { animationName: string; loadingClassName?: string },
  'animationData'
>;

const LottieAnimation = function (props: LottieAnimationProps) {
  const [animation, loaded] = useFetchAnimation(props.animationName);
  const { className, animationName, loadingClassName, ...rest } = props;

  if (!loaded) return <Lottie animationData={loading} className={loadingClassName || 'w-20'} {...rest} />;
  return <Lottie {...rest} animationData={animation} className={className} />;
};

export default LottieAnimation;
