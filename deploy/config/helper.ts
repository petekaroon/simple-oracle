export async function loadConfiguration(filename: string) {
    const config = getEnvPath();
    console.log(`🚌 load configuration from : ./config/${config}/${filename}`)
    return await import(`../config/${config}/${filename}`);
}

export const getEnvPath=() => process.argv[process.argv.length-1]