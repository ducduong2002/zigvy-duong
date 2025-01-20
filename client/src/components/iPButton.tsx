// IPButton.tsx
import React from 'react';
import { Button } from 'antd';
import { AppleOutlined } from '@ant-design/icons';

interface IPButtonProps {
  onClick: () => void;
}

const IPButton: React.FC<IPButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick} icon={<AppleOutlined />} className='basis-1/3 mx-2 rounded-lg'>
    </Button>
  );
};

export default IPButton;
