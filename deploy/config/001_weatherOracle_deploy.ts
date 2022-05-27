import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  console.log("DEPLOYER_ADDRESS", { "DEPLOYER_ADDRESS": deployer });

  // ---------------------------------------------------------------------------------------- //
  // ----------------------- Start Deploy WeatherOracle Contract  --------------------------- //
  // -----------------------------------------------------------------------------------------//

  const WeatherOracle = await deploy('WeatherOracle', {
    from: deployer,
    log: true,
  });

  console.log("RESULT_ADDRESS", { "WEATHER_ORACLE_ADDRESS": WeatherOracle.address });

  try {
    console.log("Verify WeatherOracle contract");
    await hre.run("verify:verify", {
      address: WeatherOracle.address,
    });
  } catch(error) {
    console.log(">> Verify WEATHER_ORACLE_ADDRESS failed");
    console.log(error);
  }

  console.log("\n📜 Deploy result addresses");
  console.log({ "WEATHER_ORACLE_ADDRESS": WeatherOracle.address });
  console.log("✅ Done");
}

export default func;
func.tags = ['WeatherOracle']