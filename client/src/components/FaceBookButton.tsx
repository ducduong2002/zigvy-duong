// FacebookButton.tsx
import React from 'react';
import { Button } from 'antd';
import { FacebookOutlined } from '@ant-design/icons';

interface FacebookButtonProps {
  onClick: () => void;
}

const FacebookButton: React.FC<FacebookButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick} icon={<FacebookOutlined />} className='basis-1/3 rounded-lg'>
    </Button>
  );
};

export default FacebookButton;
