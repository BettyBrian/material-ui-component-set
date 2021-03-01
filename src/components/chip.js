(() => ({
  name: 'Chip',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Chip, Avatar } = window.MaterialUI.Core;
    const { Icons } = window.MaterialUI;
    const { env, useText } = B;
    const {
      label,
      disabled,
      variant,
      startIcon,
      avatar,
      imgUrl,
      avatartype,
      size,
      testing,
    } = options;
    const isDev = env === 'dev';

    const imgSrc = imgUrl && useText(imgUrl);
    const AvatarImage = <Avatar alt="" src={imgSrc} />;
    const AvatarText = <Avatar>{avatar}</Avatar>;
    let AvatarComponent;
    if (avatartype === 'text') {
      AvatarComponent = AvatarText;
    } else if (avatartype === 'image') {
      AvatarComponent = AvatarImage;
    }

    function testingTag() {
      if (testing && testing.length > 0) {
        return `chip|${useText(testing)}`;
      }
      return 'chip';
    }

    const ChipComponent = (
      <Chip
        className={[
          classes.root,
          variant === 'default' ? classes.chip : classes.outlined,
        ].join(' ')}
        data-component={testingTag()}
        label={useText(label)}
        disabled={disabled}
        variant={variant}
        icon={
          avatartype === 'icon' && startIcon !== 'None'
            ? React.createElement(Icons[startIcon])
            : undefined
        }
        avatar={AvatarComponent}
        size={size}
      />
    );
    return isDev ? (
      <div className={classes.wrapper}>{ChipComponent}</div>
    ) : (
      ChipComponent
    );
  })(),
  styles: B => theme => {
    const { Styling } = B;
    const style = new Styling(theme);
    const convertSizes = sizes =>
      sizes.map(size => style.getSpacing(size)).join(' ');
    return {
      wrapper: {
        display: 'inline-block',
      },
      root: {
        margin: ({ options: { margin } }) => convertSizes(margin),
        color: ({ options: { textColor } }) => [
          style.getColor(textColor),
          '!important',
        ],
        '& .MuiChip-icon': {
          color: ({ options: { textColor } }) => [
            style.getColor(textColor),
            '!important',
          ],
        },
      },
      chip: {
        backgroundColor: ({ options: { color } }) => [
          style.getColor(color),
          '!important',
        ],
      },
      outlined: {
        backgroundColor: 'transparent !important',
        '&.MuiChip-outlined': {
          borderColor: ({ options: { color } }) => [
            style.getColor(color),
            '!important',
          ],
        },
      },
    };
  },
}))();
