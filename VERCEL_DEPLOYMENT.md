# Vercel Deployment Guide for Secure Premium Flow

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) if you don't have one
2. **GitHub Repository**: Ensure your code is pushed to GitHub (already completed)
3. **Environment Variables**: Prepare the required environment variables

## Step-by-Step Deployment Process

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click on "New Project" or "Add New..." → "Project"
3. Import your GitHub repository: `polinaSokolov/secure-premium-flow`

### Step 2: Configure Project Settings

1. **Project Name**: `secure-premium-flow` (or your preferred name)
2. **Framework Preset**: Select "Vite"
3. **Root Directory**: Leave as default (`.`)
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Install Command**: `npm install`

### Step 3: Set Environment Variables

In the Vercel dashboard, go to your project settings and add these environment variables:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

**How to add environment variables:**
1. Go to your project dashboard
2. Click on "Settings" tab
3. Click on "Environment Variables" in the left sidebar
4. Add each variable with the exact names and values above
5. Make sure to select "Production", "Preview", and "Development" for each variable

### Step 4: Configure Build Settings

1. **Node.js Version**: Set to `18.x` or `20.x`
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist`
4. **Install Command**: `npm install`

### Step 5: Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-5 minutes)
3. Your application will be available at the provided Vercel URL

### Step 6: Custom Domain (Optional)

1. Go to "Settings" → "Domains"
2. Add your custom domain
3. Follow the DNS configuration instructions
4. Wait for SSL certificate to be issued

## Important Configuration Notes

### Environment Variables Explanation

- `NEXT_PUBLIC_CHAIN_ID`: Ethereum Sepolia testnet chain ID
- `NEXT_PUBLIC_RPC_URL`: Primary RPC endpoint for blockchain interactions
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`: WalletConnect project ID for wallet connections
- `NEXT_PUBLIC_INFURA_API_KEY`: Infura API key for additional RPC access
- `NEXT_PUBLIC_RPC_URL`: Alternative RPC endpoint (1rpc.io)

### Build Configuration

The project uses Vite as the build tool with the following configuration:
- **Framework**: React + TypeScript
- **Build Tool**: Vite
- **Output**: Static files in `dist` directory
- **Dependencies**: All dependencies are included in package.json

### Wallet Integration

The application includes:
- **RainbowKit**: Latest version (^2.2.8)
- **Wagmi**: Version ^2.9.0
- **Viem**: Version ^2.33.0
- **Multi-wallet support**: MetaMask, Rainbow, WalletConnect, and more

### FHE Smart Contracts

The project includes FHE-enabled smart contracts for:
- Secure health data storage
- Encrypted premium calculations
- Policy management
- Claim processing

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check that all environment variables are set correctly
   - Ensure Node.js version is 18.x or higher
   - Verify all dependencies are properly installed

2. **Wallet Connection Issues**:
   - Verify WalletConnect Project ID is correct
   - Check RPC URLs are accessible
   - Ensure network is set to Sepolia testnet

3. **Environment Variables Not Loading**:
   - Make sure variables start with `NEXT_PUBLIC_`
   - Check that variables are set for all environments (Production, Preview, Development)
   - Redeploy after adding new variables

### Performance Optimization

1. **Enable Edge Functions** (if needed):
   - Go to "Functions" tab in Vercel dashboard
   - Configure edge functions for better performance

2. **Enable Analytics**:
   - Go to "Analytics" tab
   - Enable Vercel Analytics for performance monitoring

3. **Configure Caching**:
   - Set appropriate cache headers for static assets
   - Configure CDN settings for global distribution

## Post-Deployment Checklist

- [ ] Application loads without errors
- [ ] Wallet connection works properly
- [ ] All pages are accessible
- [ ] Environment variables are loaded correctly
- [ ] Smart contract interactions work (on Sepolia testnet)
- [ ] Responsive design works on mobile devices
- [ ] SSL certificate is active
- [ ] Custom domain is configured (if applicable)

## Support

If you encounter any issues during deployment:

1. Check Vercel's deployment logs in the dashboard
2. Verify all environment variables are set correctly
3. Ensure your GitHub repository is up to date
4. Check the browser console for any client-side errors

## Security Notes

- Never commit sensitive environment variables to the repository
- Use Vercel's environment variable system for all secrets
- Regularly rotate API keys and tokens
- Monitor deployment logs for any security issues

## Next Steps

After successful deployment:

1. Test all functionality on the live site
2. Set up monitoring and analytics
3. Configure automatic deployments from main branch
4. Set up staging environment for testing
5. Consider implementing CI/CD pipeline for automated testing
