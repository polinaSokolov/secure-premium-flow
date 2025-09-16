import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';
import { parseEther } from 'viem';

// Contract ABI for SecurePremiumFlow
const CONTRACT_ABI = [
  {
    "inputs": [
      {"name": "age", "type": "bytes", "internalType": "externalEuint32"},
      {"name": "bmi", "type": "bytes", "internalType": "externalEuint32"},
      {"name": "bloodPressure", "type": "bytes", "internalType": "externalEuint32"},
      {"name": "cholesterol", "type": "bytes", "internalType": "externalEuint32"},
      {"name": "glucose", "type": "bytes", "internalType": "externalEuint32"},
      {"name": "hasSmokingHistory", "type": "bool"},
      {"name": "hasFamilyHistory", "type": "bool"},
      {"name": "inputProof", "type": "bytes"}
    ],
    "name": "submitHealthData",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "healthRecordId", "type": "uint256"},
      {"name": "basePremium", "type": "bytes", "internalType": "externalEuint32"},
      {"name": "coverageAmount", "type": "bytes", "internalType": "externalEuint32"},
      {"name": "inputProof", "type": "bytes"}
    ],
    "name": "calculatePremium",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

// Contract address on Sepolia (you'll need to deploy and update this)
const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000'; // Update with actual deployed address

export const useSecurePremiumFlow = () => {
  const { address, isConnected } = useAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Simulate FHE encryption (in real implementation, this would use actual FHE libraries)
  const encryptData = (value: number): { encryptedData: string; proof: string } => {
    // This is a placeholder - in real implementation, you would use FHE libraries
    // like tfhe-rs or similar to encrypt the data
    const encryptedData = btoa(JSON.stringify({ value, timestamp: Date.now() }));
    const proof = btoa(JSON.stringify({ proof: 'fhe_proof', timestamp: Date.now() }));
    return { encryptedData, proof };
  };

  const submitHealthData = async (healthData: {
    age: number;
    bmi: number;
    bloodPressure: number;
    cholesterol: number;
    glucose: number;
    hasSmokingHistory: boolean;
    hasFamilyHistory: boolean;
  }) => {
    if (!isConnected) {
      setError('Please connect your wallet first');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Encrypt each health data field
      const encryptedAge = encryptData(healthData.age);
      const encryptedBmi = encryptData(healthData.bmi);
      const encryptedBloodPressure = encryptData(healthData.bloodPressure);
      const encryptedCholesterol = encryptData(healthData.cholesterol);
      const encryptedGlucose = encryptData(healthData.glucose);

      // Create input proof (simplified for demo)
      const inputProof = btoa(JSON.stringify({
        proofs: [encryptedAge.proof, encryptedBmi.proof, encryptedBloodPressure.proof, encryptedCholesterol.proof, encryptedGlucose.proof],
        timestamp: Date.now()
      }));

      // Call smart contract
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'submitHealthData',
        args: [
          encryptedAge.encryptedData as `0x${string}`,
          encryptedBmi.encryptedData as `0x${string}`,
          encryptedBloodPressure.encryptedData as `0x${string}`,
          encryptedCholesterol.encryptedData as `0x${string}`,
          encryptedGlucose.encryptedData as `0x${string}`,
          healthData.hasSmokingHistory,
          healthData.hasFamilyHistory,
          inputProof as `0x${string}`
        ],
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit health data');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculatePremium = async (healthRecordId: number, basePremium: number, coverageAmount: number) => {
    if (!isConnected) {
      setError('Please connect your wallet first');
      return;
    }

    setIsCalculating(true);
    setError(null);

    try {
      // Encrypt premium data
      const encryptedBasePremium = encryptData(basePremium);
      const encryptedCoverageAmount = encryptData(coverageAmount);

      // Create input proof
      const inputProof = btoa(JSON.stringify({
        proofs: [encryptedBasePremium.proof, encryptedCoverageAmount.proof],
        timestamp: Date.now()
      }));

      // Call smart contract
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'calculatePremium',
        args: [
          BigInt(healthRecordId),
          encryptedBasePremium.encryptedData as `0x${string}`,
          encryptedCoverageAmount.encryptedData as `0x${string}`,
          inputProof as `0x${string}`
        ],
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to calculate premium');
    } finally {
      setIsCalculating(false);
    }
  };

  return {
    // State
    isConnected,
    isSubmitting,
    isCalculating,
    isPending,
    isConfirming,
    isConfirmed,
    error: error || writeError?.message,
    transactionHash: hash,
    
    // Actions
    submitHealthData,
    calculatePremium,
  };
};
