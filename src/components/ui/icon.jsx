import { Box, BoxProps } from '@mui/material';
import { Icon, IconProps } from '@iconify/react';

const IconifyIcon = ({ icon, ...rest }) => {
  return <Box component={Icon} icon={icon} {...rest} />;
};

export default IconifyIcon;
