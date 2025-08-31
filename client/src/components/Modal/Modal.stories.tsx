import type { Meta, StoryObj, Decorator } from '@storybook/react-vite';
import { MemoryRouter } from "react-router";
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import Modal from './Modal.tsx';
import { useModalStore } from '../../store/modalStore.ts';

const usePortalRoot: Decorator = (Story) => {
    useEffect(() => {
        let el = document.getElementById('root');
        let created = false;
        if (!el) {
            el = document.createElement('div');
            el.id = 'root';
            document.body.appendChild(el);
            created = true;
        }
        return () => {
            useModalStore.setState({ isOpen: false, content: null as ReactNode });
            if (created && el && el.parentNode) el.parentNode.removeChild(el);
        };
    }, []);
    return <Story />;
};

const withRouter: Decorator = (Story) => (
    <MemoryRouter initialEntries={['/']}>
        <Story />
    </MemoryRouter>
);

const meta: Meta<typeof Modal> = {
    title: 'Modal',
  tags: ['autodocs'],
    component: Modal,
    globals: {
      backgrounds: {
        value: 'dark'
      }
  },
    parameters: { layout: 'centered' },
    decorators: [usePortalRoot, withRouter],
};
export default meta;

type Story = StoryObj<typeof meta>;

// хелпер для открытия модалки
function openModal(content: ReactNode) {
    useModalStore.setState({ isOpen: true, content });
}

export const Playground: Story = {
    render: () => (
        <>
            <button style={{ color: 'white', fontSize: '20px' }}
                onClick={() =>
                    openModal(
                        <div style={{ padding: 16, color: 'white' }}>
                            <h3>Пример контента</h3>
                            <p>Любая вёрстка/компоненты внутри модалки.</p>
                        </div>,
                    )
                }
            >
                Открыть модалку
            </button>
            <Modal />
        </>
    ),
};

export const OpenedByDefault: Story = {
    render: () => {
        const AutoOpen = () => {
            useEffect(() => {
                openModal(
                    <div style={{ padding: 16, color: 'white' }}>
                        <h3>Модалка открыта сразу</h3>
                        <p>Нажми ESC или крестик, чтобы закрыть.</p>
                    </div>,
                );
                return () => useModalStore.setState({ isOpen: false, content: null as ReactNode });
            }, []);
            return <Modal />;
        };
        return <AutoOpen />;
    },
};

