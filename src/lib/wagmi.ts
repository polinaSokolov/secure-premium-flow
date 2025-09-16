import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { config } from '../../config';

export const wagmiConfig = getDefaultConfig({
  appName: 'Secure Premium Flow',
  projectId: config.walletConnectProjectId,
  chains: [sepolia],
  ssr: false, // If your dApp uses server side rendering (SSR)
});
