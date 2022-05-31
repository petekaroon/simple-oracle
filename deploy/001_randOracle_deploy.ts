import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  console.log("DEPLOYER_ADDRESS", { "DEPLOYER_ADDRESS": deployer });

  // ---------------------------------------------------------------------------------------- //
  // ----------------------- Start Deploy RandOracle Contract  --------------------------- //
  // -----------------------------------------------------------------------------------------//

  const RandOracle = await deploy('RandOracle', {
    from: deployer,
    log: true,
  });

  console.log("RESULT_ADDRESS", { "RAND_ORACLE_ADDRESS": RandOracle.address });

  try {
    console.log("Verify RandOracle contract");
    await hre.run("verify:verify", {
      address: RandOracle.address,
    });
  } catch(error) {
    console.log(">> Verify RAND_ORACLE_ADDRESS failed");
    console.log(error);
  }

  console.log("\n📜 Deploy result addresses");
  console.log({ "RAND_ORACLE_ADDRESS": RandOracle.address });
  console.log("✅ Done");
}

export default func;
func.tags = ['RandOracle']