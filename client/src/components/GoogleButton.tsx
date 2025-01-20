// GoogleButton.tsx
import React from 'react';
import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';

interface GoogleButtonProps {
  onClick: () => void;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick} icon={<GoogleOutlined />} className='basis-1/3 rounded-lg'>
    </Button>
  );
};

export default GoogleButton;
