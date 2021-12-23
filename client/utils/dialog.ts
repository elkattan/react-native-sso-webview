import {Navigation} from 'react-native-navigation';
import {DialogComponent, OverlayProps} from '../components/Dialog';

export const showDialog = (
  title: string,
  content: string | JSX.Element,
  options: Omit<OverlayProps, 'title' | 'content'> & {
    interceptTouchOutside?: boolean;
  },
) => {
  const {interceptTouchOutside = true, ...props} = options;
  let overlayId = DialogComponent;

  props.closeOverlay = () => {
    Navigation.dismissOverlay(overlayId);
  };
  return new Promise<boolean>(resolve => {
    Navigation.showOverlay<OverlayProps>({
      component: {
        name: DialogComponent,
        passProps: {
          title,
          content,
          ...props,
          result: resolve,
        },
        options: {
          overlay: {
            interceptTouchOutside,
          },
          layout: {
            componentBackgroundColor: '#00000050',
          },
        },
      },
    }).then(id => (overlayId = id));
  });
};
