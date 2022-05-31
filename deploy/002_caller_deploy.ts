import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  console.log("DEPLOYER_ADDRESS", { "DEPLOYER_ADDRESS": deployer });

  // ---------------------------------------------------------------------------------------- //
  // ----------------------- Start Deploy Caller Contract  --------------------------- //
  // -----------------------------------------------------------------------------------------//

  const Caller = await deploy('Caller', {
    from: deployer,
    log: true,
  });

  console.log("RESULT_ADDRESS", { "CALLER _ADDRESS": Caller.address });

  try {
    console.log("Verify Caller contract");
    await hre.run("verify:verify", {
      address: Caller.address,
    });
  } catch(error) {
    console.log(">> Verify CALLER _ADDRESS failed");
    console.log(error);
  }

  console.log("\n📜 Deploy result addresses");
  console.log({ "CALLER _ADDRESS": Caller.address });
  console.log("✅ Done");
}

export default func;
func.tags = ['Caller']