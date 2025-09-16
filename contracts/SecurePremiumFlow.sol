// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SecurePremiumFlow is SepoliaConfig {
    using FHE for *;
    
    struct HealthData {
        euint32 age;
        euint32 bmi;
        euint32 bloodPressure;
        euint32 cholesterol;
        euint32 glucose;
        euint32 riskScore;
        bool hasSmokingHistory;
        bool hasFamilyHistory;
        address patient;
        uint256 timestamp;
    }
    
    struct PremiumCalculation {
        euint32 basePremium;
        euint32 riskAdjustment;
        euint32 finalPremium;
        euint32 coverageAmount;
        bool isCalculated;
        address insurer;
        uint256 timestamp;
    }
    
    struct InsurancePolicy {
        euint32 policyId;
        euint32 premiumAmount;
        euint32 coverageAmount;
        euint32 deductible;
        bool isActive;
        bool isPaid;
        address policyholder;
        address insurer;
        uint256 startDate;
        uint256 endDate;
        uint256 createdAt;
    }
    
    struct Claim {
        euint32 claimId;
        euint32 claimAmount;
        euint32 approvedAmount;
        bool isApproved;
        bool isProcessed;
        string claimReason;
        address claimant;
        uint256 submittedAt;
        uint256 processedAt;
    }
    
    mapping(uint256 => HealthData) public healthRecords;
    mapping(uint256 => PremiumCalculation) public premiumCalculations;
    mapping(uint256 => InsurancePolicy) public policies;
    mapping(uint256 => Claim) public claims;
    mapping(address => euint32) public patientRiskScores;
    mapping(address => euint32) public insurerReputation;
    mapping(address => bool) public authorizedInsurers;
    
    uint256 public healthRecordCounter;
    uint256 public premiumCalculationCounter;
    uint256 public policyCounter;
    uint256 public claimCounter;
    
    address public owner;
    address public verifier;
    
    event HealthDataSubmitted(uint256 indexed recordId, address indexed patient);
    event PremiumCalculated(uint256 indexed calculationId, address indexed patient, address indexed insurer);
    event PolicyCreated(uint256 indexed policyId, address indexed policyholder, address indexed insurer);
    event ClaimSubmitted(uint256 indexed claimId, address indexed claimant);
    event ClaimProcessed(uint256 indexed claimId, bool approved, uint32 approvedAmount);
    event InsurerAuthorized(address indexed insurer, bool authorized);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyAuthorizedInsurer() {
        require(authorizedInsurers[msg.sender], "Only authorized insurers can call this function");
        _;
    }
    
    function authorizeInsurer(address insurer, bool authorized) public onlyOwner {
        authorizedInsurers[insurer] = authorized;
        emit InsurerAuthorized(insurer, authorized);
    }
    
    function submitHealthData(
        externalEuint32 age,
        externalEuint32 bmi,
        externalEuint32 bloodPressure,
        externalEuint32 cholesterol,
        externalEuint32 glucose,
        bool hasSmokingHistory,
        bool hasFamilyHistory,
        bytes calldata inputProof
    ) public returns (uint256) {
        uint256 recordId = healthRecordCounter++;
        
        // Convert external encrypted values to internal encrypted values
        euint32 internalAge = FHE.fromExternal(age, inputProof);
        euint32 internalBmi = FHE.fromExternal(bmi, inputProof);
        euint32 internalBloodPressure = FHE.fromExternal(bloodPressure, inputProof);
        euint32 internalCholesterol = FHE.fromExternal(cholesterol, inputProof);
        euint32 internalGlucose = FHE.fromExternal(glucose, inputProof);
        
        // Calculate risk score using FHE operations
        euint32 riskScore = FHE.add(
            FHE.add(
                FHE.add(
                    FHE.add(internalAge, internalBmi),
                    internalBloodPressure
                ),
                internalCholesterol
            ),
            internalGlucose
        );
        
        healthRecords[recordId] = HealthData({
            age: internalAge,
            bmi: internalBmi,
            bloodPressure: internalBloodPressure,
            cholesterol: internalCholesterol,
            glucose: internalGlucose,
            riskScore: riskScore,
            hasSmokingHistory: hasSmokingHistory,
            hasFamilyHistory: hasFamilyHistory,
            patient: msg.sender,
            timestamp: block.timestamp
        });
        
        patientRiskScores[msg.sender] = riskScore;
        
        emit HealthDataSubmitted(recordId, msg.sender);
        return recordId;
    }
    
    function calculatePremium(
        uint256 healthRecordId,
        externalEuint32 basePremium,
        externalEuint32 coverageAmount,
        bytes calldata inputProof
    ) public onlyAuthorizedInsurer returns (uint256) {
        require(healthRecords[healthRecordId].patient != address(0), "Health record does not exist");
        
        uint256 calculationId = premiumCalculationCounter++;
        
        // Convert external encrypted values to internal encrypted values
        euint32 internalBasePremium = FHE.fromExternal(basePremium, inputProof);
        euint32 internalCoverageAmount = FHE.fromExternal(coverageAmount, inputProof);
        
        // Get patient's risk score
        euint32 riskScore = healthRecords[healthRecordId].riskScore;
        
        // Calculate risk adjustment (simplified formula)
        euint32 riskAdjustment = FHE.mul(riskScore, FHE.asEuint32(10)); // 10% per risk point
        
        // Calculate final premium
        euint32 finalPremium = FHE.add(internalBasePremium, riskAdjustment);
        
        premiumCalculations[calculationId] = PremiumCalculation({
            basePremium: internalBasePremium,
            riskAdjustment: riskAdjustment,
            finalPremium: finalPremium,
            coverageAmount: internalCoverageAmount,
            isCalculated: true,
            insurer: msg.sender,
            timestamp: block.timestamp
        });
        
        emit PremiumCalculated(calculationId, healthRecords[healthRecordId].patient, msg.sender);
        return calculationId;
    }
    
    function createPolicy(
        uint256 premiumCalculationId,
        externalEuint32 deductible,
        uint256 duration
    ) public returns (uint256) {
        require(premiumCalculations[premiumCalculationId].isCalculated, "Premium calculation not found");
        require(premiumCalculations[premiumCalculationId].insurer == msg.sender, "Only insurer can create policy");
        
        uint256 policyId = policyCounter++;
        
        // Convert external encrypted value to internal encrypted value
        euint32 internalDeductible = FHE.fromExternal(deductible, inputProof);
        
        policies[policyId] = InsurancePolicy({
            policyId: FHE.asEuint32(0), // Will be set properly later
            premiumAmount: premiumCalculations[premiumCalculationId].finalPremium,
            coverageAmount: premiumCalculations[premiumCalculationId].coverageAmount,
            deductible: internalDeductible,
            isActive: true,
            isPaid: false,
            policyholder: healthRecords[premiumCalculationId].patient,
            insurer: msg.sender,
            startDate: block.timestamp,
            endDate: block.timestamp + duration,
            createdAt: block.timestamp
        });
        
        emit PolicyCreated(policyId, healthRecords[premiumCalculationId].patient, msg.sender);
        return policyId;
    }
    
    function submitClaim(
        uint256 policyId,
        externalEuint32 claimAmount,
        string memory claimReason
    ) public returns (uint256) {
        require(policies[policyId].policyholder == msg.sender, "Only policyholder can submit claim");
        require(policies[policyId].isActive, "Policy is not active");
        require(block.timestamp <= policies[policyId].endDate, "Policy has expired");
        
        uint256 claimId = claimCounter++;
        
        // Convert external encrypted value to internal encrypted value
        euint32 internalClaimAmount = FHE.fromExternal(claimAmount, inputProof);
        
        claims[claimId] = Claim({
            claimId: FHE.asEuint32(0), // Will be set properly later
            claimAmount: internalClaimAmount,
            approvedAmount: FHE.asEuint32(0),
            isApproved: false,
            isProcessed: false,
            claimReason: claimReason,
            claimant: msg.sender,
            submittedAt: block.timestamp,
            processedAt: 0
        });
        
        emit ClaimSubmitted(claimId, msg.sender);
        return claimId;
    }
    
    function processClaim(
        uint256 claimId,
        bool approved,
        externalEuint32 approvedAmount,
        bytes calldata inputProof
    ) public onlyAuthorizedInsurer {
        require(claims[claimId].claimant != address(0), "Claim does not exist");
        require(!claims[claimId].isProcessed, "Claim already processed");
        
        euint32 internalApprovedAmount = FHE.fromExternal(approvedAmount, inputProof);
        
        claims[claimId].isApproved = approved;
        claims[claimId].approvedAmount = internalApprovedAmount;
        claims[claimId].isProcessed = true;
        claims[claimId].processedAt = block.timestamp;
        
        emit ClaimProcessed(claimId, approved, 0); // Amount will be decrypted off-chain
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        insurerReputation[user] = reputation;
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getHealthRecordInfo(uint256 recordId) public view returns (
        uint8 age,
        uint8 bmi,
        uint8 bloodPressure,
        uint8 cholesterol,
        uint8 glucose,
        uint8 riskScore,
        bool hasSmokingHistory,
        bool hasFamilyHistory,
        address patient,
        uint256 timestamp
    ) {
        HealthData storage record = healthRecords[recordId];
        return (
            0, // FHE.decrypt(record.age) - will be decrypted off-chain
            0, // FHE.decrypt(record.bmi) - will be decrypted off-chain
            0, // FHE.decrypt(record.bloodPressure) - will be decrypted off-chain
            0, // FHE.decrypt(record.cholesterol) - will be decrypted off-chain
            0, // FHE.decrypt(record.glucose) - will be decrypted off-chain
            0, // FHE.decrypt(record.riskScore) - will be decrypted off-chain
            record.hasSmokingHistory,
            record.hasFamilyHistory,
            record.patient,
            record.timestamp
        );
    }
    
    function getPremiumCalculationInfo(uint256 calculationId) public view returns (
        uint8 basePremium,
        uint8 riskAdjustment,
        uint8 finalPremium,
        uint8 coverageAmount,
        bool isCalculated,
        address insurer,
        uint256 timestamp
    ) {
        PremiumCalculation storage calculation = premiumCalculations[calculationId];
        return (
            0, // FHE.decrypt(calculation.basePremium) - will be decrypted off-chain
            0, // FHE.decrypt(calculation.riskAdjustment) - will be decrypted off-chain
            0, // FHE.decrypt(calculation.finalPremium) - will be decrypted off-chain
            0, // FHE.decrypt(calculation.coverageAmount) - will be decrypted off-chain
            calculation.isCalculated,
            calculation.insurer,
            calculation.timestamp
        );
    }
    
    function getPolicyInfo(uint256 policyId) public view returns (
        uint8 premiumAmount,
        uint8 coverageAmount,
        uint8 deductible,
        bool isActive,
        bool isPaid,
        address policyholder,
        address insurer,
        uint256 startDate,
        uint256 endDate,
        uint256 createdAt
    ) {
        InsurancePolicy storage policy = policies[policyId];
        return (
            0, // FHE.decrypt(policy.premiumAmount) - will be decrypted off-chain
            0, // FHE.decrypt(policy.coverageAmount) - will be decrypted off-chain
            0, // FHE.decrypt(policy.deductible) - will be decrypted off-chain
            policy.isActive,
            policy.isPaid,
            policy.policyholder,
            policy.insurer,
            policy.startDate,
            policy.endDate,
            policy.createdAt
        );
    }
    
    function getClaimInfo(uint256 claimId) public view returns (
        uint8 claimAmount,
        uint8 approvedAmount,
        bool isApproved,
        bool isProcessed,
        string memory claimReason,
        address claimant,
        uint256 submittedAt,
        uint256 processedAt
    ) {
        Claim storage claim = claims[claimId];
        return (
            0, // FHE.decrypt(claim.claimAmount) - will be decrypted off-chain
            0, // FHE.decrypt(claim.approvedAmount) - will be decrypted off-chain
            claim.isApproved,
            claim.isProcessed,
            claim.claimReason,
            claim.claimant,
            claim.submittedAt,
            claim.processedAt
        );
    }
    
    function getPatientRiskScore(address patient) public view returns (uint8) {
        return 0; // FHE.decrypt(patientRiskScores[patient]) - will be decrypted off-chain
    }
    
    function getInsurerReputation(address insurer) public view returns (uint8) {
        return 0; // FHE.decrypt(insurerReputation[insurer]) - will be decrypted off-chain
    }
    
    function payPremium(uint256 policyId) public payable {
        require(policies[policyId].policyholder == msg.sender, "Only policyholder can pay premium");
        require(policies[policyId].isActive, "Policy is not active");
        require(!policies[policyId].isPaid, "Premium already paid");
        
        // In a real implementation, the premium amount would be decrypted and compared
        // For now, we'll accept any payment and mark as paid
        policies[policyId].isPaid = true;
        
        // Transfer payment to insurer
        payable(policies[policyId].insurer).transfer(msg.value);
    }
    
    function withdrawFunds(uint256 claimId) public {
        require(claims[claimId].claimant == msg.sender, "Only claimant can withdraw");
        require(claims[claimId].isApproved, "Claim not approved");
        require(claims[claimId].isProcessed, "Claim not processed");
        
        // In a real implementation, the approved amount would be decrypted and transferred
        // For now, we'll transfer a placeholder amount
        claims[claimId].isProcessed = true;
        
        // payable(msg.sender).transfer(approvedAmount);
    }
}
