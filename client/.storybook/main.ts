import type { StorybookConfig } from '@storybook/react-vite';
import svgr from "vite-plugin-svgr";

const config: StorybookConfig = {
    stories: ['../src/**/**/*.stories.@(ts|tsx)', '../src/**/**/*.stories.@(ts|tsx)'],
    framework: '@storybook/react-vite',
    addons: ['@storybook/addon-essentials'],
    staticDirs: ['../public'],
    viteFinal: async (config) => {
        config.plugins = [...(config.plugins ?? []), svgr()];
        return config;
    }
}

export default config;