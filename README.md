# Secure Premium Flow - FHE Insurance Platform

A revolutionary insurance platform powered by Fully Homomorphic Encryption (FHE) technology, enabling secure premium calculations while protecting sensitive health data.

## Features

- **FHE-Powered Security**: All sensitive health data is encrypted using fully homomorphic encryption
- **Real-time Premium Calculation**: Calculate insurance premiums without exposing personal health information
- **Multi-Wallet Support**: Connect with various Web3 wallets including Rainbow, MetaMask, and more
- **Decentralized Architecture**: Built on blockchain for transparency and security
- **Privacy-First Design**: Your health data remains encrypted throughout the entire process

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Web3 Integration**: Wagmi, RainbowKit, Viem
- **Blockchain**: Ethereum Sepolia Testnet
- **Encryption**: FHE (Fully Homomorphic Encryption)
- **Smart Contracts**: Solidity with FHE support

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Web3 wallet (MetaMask, Rainbow, etc.)
- Sepolia ETH for gas fees

### Installation

```bash
# Clone the repository
git clone https://github.com/polinaSokolov/secure-premium-flow.git

# Navigate to the project directory
cd secure-premium-flow

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

## How It Works

1. **Connect Wallet**: Users connect their Web3 wallet to the platform
2. **Submit Health Data**: Health information is encrypted using FHE before submission
3. **Premium Calculation**: Insurance premiums are calculated on encrypted data
4. **Secure Results**: Results are returned without exposing sensitive information
5. **Smart Contract Integration**: All transactions are recorded on-chain for transparency

## Smart Contracts

The platform includes FHE-enabled smart contracts for:
- Secure health data storage
- Encrypted premium calculations
- Transparent claim processing
- Reputation management

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue on GitHub or contact the development team.

## Roadmap

- [ ] Multi-chain support
- [ ] Advanced FHE operations
- [ ] Mobile app development
- [ ] Integration with more insurance providers
- [ ] AI-powered risk assessment
