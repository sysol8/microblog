import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import '../../styles/variables.css';
import '../../styles/global.css'

import Alert from './Alert.tsx';

const meta = {
    component: Alert,
    title: 'Alert',
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        type: {
            control: { type: 'select' },
            options: ['success', 'warning', 'error', 'info',]
        },
        message: { control: 'text' },
        faded: { control: 'boolean' },
        onDelete: { action: 'delete' }
    },
    args: {
        id: '1',
        onDelete: fn(),
        faded: false
    }
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
    args: {
        type: 'success',
        message: 'Сообщение об успехе',
    },
};

export const Warning: Story = {
    args: {
        type: 'warning',
        message: 'Внимательно проверьте данные',
    },
};

export const Error: Story = {
    args: {
        type: 'error',
        message: 'Что-то пошло не так',
    },
};

export const Info: Story = {
    args: {
        type: 'info',
        message: 'Полезная информация',
    },
};

export const Faded: Story = {
    args: {
        type: 'success',
        message: 'Закрывается…',
        faded: true,
    },
};